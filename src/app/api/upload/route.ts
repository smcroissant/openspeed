import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const startTime = Date.now();
  
  try {
    // Read the entire body to simulate upload processing
    const data = await request.arrayBuffer();
    const bytesReceived = data.byteLength;
    const endTime = Date.now();
    
    return NextResponse.json({
      success: true,
      bytesReceived,
      duration: endTime - startTime,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Upload failed' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

