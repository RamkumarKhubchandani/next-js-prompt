export const day24 = {
  day: 24,
  title: "File Uploads (Streaming + S3 Presigned URLs)",
  intro: "File uploads are a security and performance minefield. Do them like a senior: stream, validate, and never trust content-type.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Why streaming uploads prevent memory blowups.</li>
  <li>Presigned URLs: client uploads directly to S3 (API stays fast).</li>
  <li>Security basics: size limits, content-type validation, and malware scanning pipeline.</li>
  <li>Public vs private files, and signed download URLs.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The Best Pattern: Direct-to-Object-Storage</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-purple-700 dark:text-purple-300 mb-6 overflow-x-auto">
<pre>
Client → (GET presign) → API
Client → (PUT file) → S3
Client → (notify) → API (store metadata)
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Security Checklist</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Limit size and enforce MIME allowlist (and verify content signatures if needed).</li>
  <li>Store uploads in a private bucket. Serve via signed URLs or CDN with auth.</li>
  <li>Scan in background (queue) for malware before making public.</li>
</ul>
            `,
  code: `/**
 * Day 24: Presigned upload URL idea (AWS SDK v3 - conceptual)
 * Install (if using AWS): npm i @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
 */

// PSEUDOCODE (outline only):
// const s3 = new S3Client({ region: '...' })
// const command = new PutObjectCommand({
//   Bucket: process.env.UPLOAD_BUCKET,
//   Key: 'uploads/' + userId + '/' + fileId,
//   ContentType: mimeType,
// })
// const url = await getSignedUrl(s3, command, { expiresIn: 60 })
// return { uploadUrl: url, key: command.input.Key }`,
  comparison: {
    junior: `// ❌ Upload through API into memory
app.post('/upload', async (req, res) => {
  const buf = await readEntireRequestIntoBuffer(req); // memory risk
  await s3.putObject({ Body: buf });
  res.json({ ok: true });
});`,
    senior: `// ✅ Direct-to-S3 + background scan
// 1) API returns presigned URL
// 2) client uploads directly to storage
// 3) worker scans + marks file safe`
  },
  interview: {
    questions: [
      {
        q: "Why prefer streaming uploads?",
        a: "It avoids loading entire files into memory, reducing OOM risk and improving throughput under concurrent uploads."
      },
      {
        q: "What is a presigned URL and why use it?",
        a: "A time-limited URL granting permission to upload/download an object. It keeps your API fast and reduces server bandwidth costs."
      },
      {
        q: "Name 3 upload security concerns.",
        a: "Malware, oversized files (DoS), and content-type spoofing. Mitigate with size limits, allowlists, scanning, and storing privately by default."
      }
    ]
  }
};
