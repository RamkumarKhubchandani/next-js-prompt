import React from 'react';
import connectDB from '../../lib/mongodb';
import QuizResult from '../../models/QuizResult';

async function getQuizResults() {
    await connectDB();
    const results = await QuizResult.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(results));
}

export default async function QuizResultsPage() {
    const results = await getQuizResults();

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Quiz Assessment Results</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-dark-800 rounded-lg">
                    <thead className="bg-dark-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-light-200 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-light-200 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-light-200 uppercase tracking-wider">Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-light-200 uppercase tracking-wider">Technologies</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-light-200 uppercase tracking-wider">Score</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-light-200 uppercase tracking-wider">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-dark-700">
                        {results.map((result) => (
                            <tr key={result._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-light-100">{result.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-light-200">{result.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-light-200">{result.phone}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-light-200">{result.technologies.join(', ')}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-light-200">{result.score} / {result.total}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-light-200">{new Date(result.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
