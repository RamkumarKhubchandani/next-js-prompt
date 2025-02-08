import TutorialDisplay from '../../components/TutorialDisplay';

async function getTutorial(topic) {
  const params = new URLSearchParams();
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
  if (topic) params.append('slug', topic);
  const res = await fetch(`${baseUrl}/api/tutorials?${params}`);
  if (!res.ok) throw new Error('Failed to fetch tutorial');
  return await res.json();
}
// export async function generateStaticParams() {
//     // This ensures all topic pages are generated at build time
//     return topics.map((topic) => ({
//       slug: topic.slug,
//     }));
//   }
  
//   export async function generateMetadata({ params }) {
//     const topic = topics.find((t) => t.slug === params.slug);
    
//     return {
//       title: `${topic?.title || 'JavaScript Tutorial'} | JS Prompt`,
//       description: `Learn ${topic?.title} with detailed explanations and examples`,
//     };
//   }
  
//   export default function TopicPage({ params }) {
//     const topic = topics.find((t) => t.slug === params.slug);
    
//     if (!topic) {
//       return <div>Topic not found</div>;
//     }
  
//     return (
//       <article className="max-w-3xl mx-auto prose prose-slate">
//         <h1>{topic.title}</h1>
//         {/* Add your content here */}
//       </article>
//     );
//   }
  

export default async function TopicPage({ params }) {
    const { slug } =  await params;
    const tutorial = await getTutorial(slug);
    
    return (
      <div className="flex-1 p-6 ml-64">
        <article className="max-w-3xl mx-auto prose prose-slate">
          <h1>Topic: {slug}</h1>
          {/* Add your content here */}
        </article>
        <TutorialDisplay tutorial={tutorial[0]} />
      </div>
    );
  }
  