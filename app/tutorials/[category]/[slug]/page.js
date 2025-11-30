import { notFound } from 'next/navigation';
import connectDB from '../../../lib/mongodb';
import Post from '../../../models/Post';
import User from '../../../models/User'; // Import User model
import SafeTiptapView from '../../../components/public/SafeTiptapView';
import CompleteButton from '../../../components/public/CompleteButton'; // Import CompleteButton
import { getServerSession } from 'next-auth'; // Import Session
import { authOptions } from '../../../lib/auth'; // Import Auth Options

async function getPost(category, slug) {
    await connectDB();
    const post = await Post.findOne({ category, slug }).populate('author', 'name');
    if (!post) {
        return notFound();
    }
    return post;
}

export async function generateMetadata({ params: paramsPromise }) {
    const params = await paramsPromise;
    const { category, slug } = params;
    const post = await getPost(category, slug);
    return {
        title: post.metaTitle || post.title,
        description: post.metaDescription || 'Default description',
        keywords: post.keywords || [],
    };
}

export default async function PostPage({ params: paramsPromise }) {
    const params = await paramsPromise;
    const { category, slug } = params;
    const post = await getPost(category, slug);
    
    // Check user progress
    const session = await getServerSession(authOptions);
    let isCompleted = false;

    if (session?.user?.email) {
        const user = await User.findOne({ email: session.user.email });
        if (user && user.completedTutorials) {
            isCompleted = user.completedTutorials.some(id => id.toString() === post._id.toString());
        }
    }

    return (
        <div className="min-h-screen flex justify-center py-28 px-4 sm:px-6 lg:px-8">
            <article className="prose dark:prose-invert lg:prose-xl max-w-4xl">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">{post.title}</h1>
                    <p className="text-lg">
                        By {post.author?.name || 'Admin'} in <span className="text-brand-primary">{post.category}</span>
                    </p>
                </header>
                <SafeTiptapView content={post.content} />
                
                <hr className="my-12 border-gray-700" />
                
                <CompleteButton postId={post._id.toString()} initialCompleted={isCompleted} />
            </article>
        </div>
    );
}
