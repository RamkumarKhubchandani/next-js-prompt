import { Sidebar } from './components/Sidebar';

// export default function StoreLayout({ children }) {
//     return (
//       <div className="flex min-h-screen">
//         <Sidebar />
//         <main className="flex-1 p-6 ml-64">
//           {children}
//         </main>
//       </div>
//     );
//   }

export default function JavaScriptTutorialsLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8 ml-64">
        <div className="mx-auto max-w-4xl">
          {children}
        </div>
      </main>
    </div>
  );
}