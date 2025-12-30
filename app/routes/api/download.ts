import type { LoaderFunctionArgs } from "react-router";

// Generate random data for download test
const CHUNK_SIZE = 1024 * 1024; // 1MB chunks

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const size = parseInt(url.searchParams.get('size') || '10', 10); // Size in MB
  
  // Generate random bytes
  const totalSize = Math.min(size, 100) * CHUNK_SIZE; // Cap at 100MB
  const data = new Uint8Array(totalSize);
  
  // Fill with random data
  for (let i = 0; i < data.length; i++) {
    data[i] = Math.floor(Math.random() * 256);
  }
  
  return new Response(data, {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Length': totalSize.toString(),
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'X-Speed-Test': 'true',
    },
  });
}

