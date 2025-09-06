import Link from 'next/link';

export default function AdminPage() {
    return (
        <div className="p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-4xl font-bold">Admin Dashboard</h1>
                    <Link href="/">
                        <button className="text-sm hover:text-brand-primary">
                            View Main Site
                        </button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Link href="/admin/posts/create">
                        <div className="bg-light-100 dark:bg-dark-800 p-6 rounded-2xl border border-gray-200 dark:border-dark-700 hover:border-brand-primary transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                            <h2 className="text-2xl font-bold mb-2">Create New Post</h2>
                            <p>
                                Write a new blog post, tutorial, or puzzle.
                            </p>
                        </div>
                    </Link>

                    {/* Future dashboard cards can be added here */}
                    <div className="bg-light-100 dark:bg-dark-800 p-6 rounded-2xl border border-gray-200 dark:border-dark-700">
                        <h2 className="text-2xl font-bold mb-2">View Posts</h2>
                        <p>
                            (Coming Soon)
                        </p>
                    </div>
                    <div className="bg-light-100 dark:bg-dark-800 p-6 rounded-2xl border border-gray-200 dark:border-dark-700">
                        <h2 className="text-2xl font-bold mb-2">Manage Users</h2>
                        <p>
                            (Coming Soon)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}