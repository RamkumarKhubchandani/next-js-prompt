import { notFound } from 'next/navigation';
import connectDB from '../../../lib/mongodb';
import Post from '../../../models/Post';
import SafeTiptapView from '../../../components/public/SafeTiptapView';

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
        <div className="min-h-screen flex justify-center py-28 px-4 sm:px-6 lg:px-8">
            <article className="prose dark:prose-invert lg:prose-xl max-w-4xl">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">{post.title}</h1>
                    <p className="text-lg">
                        By {post.author?.name || 'Admin'} in <span className="text-brand-primary">{post.category}</span>
                    </p>
                </header>
                <SafeTiptapView content={post.content} />
            </article>
        </div>
    );
}
