import { NextResponse } from 'next/server';

export function proxy(request) {
  const clinicSlug = request.nextUrl.searchParams.get('clinic');
  const adminMode = request.nextUrl.searchParams.get('admin');

  if (request.nextUrl.pathname === '/' && clinicSlug) {
    const url = request.nextUrl.clone();
    url.pathname = `/clinic/${clinicSlug}`;
    url.search = '';
    return NextResponse.redirect(url, 301);
  }

  if (request.nextUrl.pathname === '/' && adminMode === '1') {
    const url = request.nextUrl.clone();
    url.pathname = '/admin';
    url.search = '';
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/']
};
