import type { ActionFunctionArgs } from "react-router";

export async function action({ request }: ActionFunctionArgs) {
  const startTime = Date.now();
  
  try {
    // Read the entire body to simulate upload processing
    const data = await request.arrayBuffer();
    const bytesReceived = data.byteLength;
    const endTime = Date.now();
    
    return Response.json({
      success: true,
      bytesReceived,
      duration: endTime - startTime,
    });
  } catch (error) {
    return Response.json(
      { success: false, error: 'Upload failed' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS preflight
export async function loader() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

