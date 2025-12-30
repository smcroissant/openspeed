import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    timestamp: Date.now(),
    pong: true,
  }, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}

export async function POST() {
  return NextResponse.json({
    timestamp: Date.now(),
    pong: true,
  }, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}

