import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const callbackUrl = searchParams.get('callback'); // 'next' url basically

    // Build state to include callback/next URL. 
    // Ideally this should be a random string stored in cookie to verify CSRF.
    // For simplicity validating matching logic, we just pass the callback url.
    // Security Note: In production, use signed state or session cookie to prevent open redirect/CSRF.
    const state = callbackUrl ? callbackUrl : 'random_state_string';

    const lineAuthUrl = new URL('https://access.line.me/oauth2/v2.1/authorize');
    lineAuthUrl.searchParams.append('response_type', 'code');
    lineAuthUrl.searchParams.append('client_id', process.env.LINE_LOGIN_CHANNEL_ID!);
    lineAuthUrl.searchParams.append('redirect_uri', process.env.NEXT_PUBLIC_LINE_LOGIN_REDIRECT_URI!);
    lineAuthUrl.searchParams.append('state', state);
    lineAuthUrl.searchParams.append('scope', 'profile openid');
    // 'profile' gets displayName, pictureUrl. 'openid' gets id_token (optional if we just use profile endpoint).

    return NextResponse.redirect(lineAuthUrl);
}
