import { NextResponse } from 'next/server';

/**
 * Route Handler untuk menangani permintaan GET.
 * @returns {NextResponse} Data JSON sederhana.
 */
export async function GET() {
  const data = {
    message: 'Halo dari Next.js API!',
    timestamp: new Date().toISOString(),
    status: 200,
  };

  // NextResponse.json() adalah cara yang direkomendasikan untuk mengirim respons JSON
  return NextResponse.json(data);
}

// export async function GET(req) {
//   return handleRequest(req, 'GET');
// }
