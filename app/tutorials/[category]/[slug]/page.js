import { notFound } from 'next/navigation';
import connectDB from '../../../lib/mongodb';
import Post from '../../../models/Post';
import TiptapView from '../../../components/public/TiptapView';

async function getPost(category, slug) {
    await connectDB();
    const post = await Post.findOne({ category, slug }).populate('author', 'name');
    if (!post) {
        return notFound();
    }
    return post;
}

export async function generateMetadata({ params }) {
    const { category, slug } = params;
    const post = await getPost(category, slug);
    return {
        title: post.metaTitle || post.title,
        description: post.metaDescription || 'Default description',
        keywords: post.keywords || [],
    };
}

export default async function PostPage({ params }) {
    const { category, slug } = params;
    const post = await getPost(category, slug);

    return (
        <div className="min-h-screen bg-dark-900 text-light-100 p-8 md:p-12">
            <div className="max-w-4xl mx-auto prose prose-invert">
                <h1 className="text-5xl font-bold mb-4">{post.title}</h1>
                <p className="text-light-200 mb-8">
                    By {post.author?.name || 'Admin'} in <span className="text-brand-primary">{post.category}</span>
                </p>
                <TiptapView content={post.content} />
            </div>
        </div>
    );
}
