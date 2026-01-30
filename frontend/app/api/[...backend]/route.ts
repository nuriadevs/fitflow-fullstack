// app/api/[...backend]/route.ts
import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

export async function GET(request: NextRequest) {
  return proxyToBackend(request);
}

export async function POST(request: NextRequest) {
  return proxyToBackend(request);
}

export async function PUT(request: NextRequest) {
  return proxyToBackend(request);
}

export async function DELETE(request: NextRequest) {
  return proxyToBackend(request);
}

async function proxyToBackend(request: NextRequest) {

  const pathname = request.nextUrl.pathname;
  const search = request.nextUrl.search;
  

  const apiPath = pathname.startsWith('/api') 
    ? pathname 
    : `/api${pathname}`;
  
  const backendUrl = `${BACKEND_URL}${apiPath}${search}`;



  try {

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };


    const cookieHeader = request.headers.get('cookie');
    if (cookieHeader) {
      headers['Cookie'] = cookieHeader;

    }


    const response = await fetch(backendUrl, {
      method: request.method,
      headers,
      body: request.method !== 'GET' && request.method !== 'HEAD' 
        ? await request.text() 
        : undefined,
      credentials: 'include',
    });



    // Leer la respuesta
    const contentType = response.headers.get('content-type');
    let data;

    if (contentType?.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    // Crear respuesta de Next.js
    const nextResponse = NextResponse.json(data, {
      status: response.status,
    });

    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      nextResponse.headers.set('Set-Cookie', setCookieHeader);
    }

    return nextResponse;

  } catch (error) {
    console.error('❌ [PROXY] Error:', error);
    return NextResponse.json(
      { 
        message: 'Error de conexión con el backend',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}