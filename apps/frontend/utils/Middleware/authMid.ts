import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const AuthMiddleware = async (req: NextRequest): Promise<NextResponse> => {
    const token = await getToken({ req: req as any, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
        
        return NextResponse.redirect(new URL('/signin', req.url));
    }

    return NextResponse.next();
};

