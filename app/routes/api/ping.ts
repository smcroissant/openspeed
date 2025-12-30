import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router";

export async function loader() {
  return Response.json({
    timestamp: Date.now(),
    pong: true,
  }, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}

export async function action() {
  return Response.json({
    timestamp: Date.now(),
    pong: true,
  }, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}

