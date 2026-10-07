import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { v2 as cloudinary } from 'cloudinary';

export async function POST(req) {
    try {
        // 1. Session Authentication Check
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized: You must be logged in to upload a mentor photo.' },
                { status: 401 }
            );
        }

        // 2. Parse Multipart Form Data
        const formData = await req.formData();
        const file = formData.get('file');

        if (!file || typeof file === 'string') {
            return NextResponse.json(
                { error: 'No image file provided.' },
                { status: 400 }
            );
        }

        // 3. Validate File Size (5MB limit)
        const MAX_SIZE = 5 * 1024 * 1024; // 5MB
        if (file.size > MAX_SIZE) {
            return NextResponse.json(
                { error: 'File size exceeds the 5MB limit. Please upload a smaller image.' },
                { status: 400 }
            );
        }

        // 4. Validate File MIME Type (jpg, jpeg, png, webp only)
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
        const fileType = file.type ? file.type.toLowerCase() : '';
        if (!allowedMimeTypes.includes(fileType)) {
            return NextResponse.json(
                { error: 'Invalid file format. Only JPG, PNG, and WebP images are allowed.' },
                { status: 400 }
            );
        }

        // 5. Check Cloudinary Configuration
        const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
        if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
            return NextResponse.json(
                { error: 'Server configuration error: Cloudinary credentials (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET) are missing.' },
                { status: 500 }
            );
        }

        cloudinary.config({
            cloud_name: CLOUDINARY_CLOUD_NAME,
            api_key: CLOUDINARY_API_KEY,
            api_secret: CLOUDINARY_API_SECRET,
        });

        // 6. Convert file buffer to base64 Data URI
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Data = `data:${file.type};base64,${buffer.toString('base64')}`;

        // 7. Upload to Cloudinary with Face-Cropping and Optimization Transformations
        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload(
                base64Data,
                {
                    folder: 'mentor-profiles',
                    resource_type: 'image',
                    transformation: [
                        { width: 400, height: 400, crop: 'fill', gravity: 'face' },
                        { fetch_format: 'auto', quality: 'auto' }
                    ]
                },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
        });

        return NextResponse.json({
            success: true,
            url: uploadResult.secure_url,
            public_id: uploadResult.public_id
        }, { status: 200 });

    } catch (error) {
        console.error('Mentor photo upload error:', error);
        return NextResponse.json(
            { error: error.message || 'An unexpected error occurred while uploading your photo.' },
            { status: 500 }
        );
    }
}
