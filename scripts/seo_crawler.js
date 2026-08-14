const fs = require('fs');
const path = require('path');

const appDir = 'c:/Users/admin/Desktop/My-data/next-js-prompt/app';

function getFilesRecursively(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath));
    } else {
      results.push(fullPath);
    }
  });
  return results;
}

function analyzeMetadata() {
  const allFiles = getFilesRecursively(appDir);
  const pageFiles = allFiles.filter(file => path.basename(file).startsWith('page.'));

  const report = [];

  pageFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const relativePath = path.relative(path.resolve(appDir, '..'), file).replace(/\\/g, '/');
    const route = relativePath.replace('app', '').replace(/\/page\.[a-z]+$/, '') || '/';

    const hasStaticMetadata = content.includes('const metadata =') || content.includes('export const metadata');
    const hasDynamicMetadata = content.includes('generateMetadata');
    const hasTitle = content.includes('title:') || content.includes('generateMetadata') || content.includes('<title>') || content.includes('title =');
    const hasDescription = content.includes('description:') || content.includes('generateMetadata') || content.includes('<meta name="description"') || content.includes('description =');
    const hasCanonical = content.includes('canonical:') || content.includes('generateMetadata') || content.includes('rel="canonical"');
    const hasOG = content.includes('openGraph:') || content.includes('og:') || content.includes('generateMetadata');
    const hasJSONLD = content.includes('application/ld+json') || content.includes('jsonLd') || content.includes('faqSchema') || content.includes('breadcrumbSchema') || content.includes('eventSchema') || content.includes('courseSchema');

    report.push({
      file: relativePath,
      route,
      hasStaticMetadata,
      hasDynamicMetadata,
      hasTitle,
      hasDescription,
      hasCanonical,
      hasOG,
      hasJSONLD
    });
  });

  const outputPath = 'C:/Users/admin/.gemini/antigravity/brain/5f74f4d7-6ceb-47a7-90d5-40e79b6082b3/scratch/crawl_report.json';
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2), 'utf8');
  console.log("Done. Written to crawl_report.json");
}

analyzeMetadata();
