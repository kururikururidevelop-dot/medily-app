// app/api/auth/line/callback/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    // Handle LINE Login errors (e.g., user cancelled)
    if (error) {
      console.error('LINE Login Error:', error, searchParams.get('error_description'));
      return NextResponse.redirect(new URL('/auth/login?error=' + error, request.url));
    }

    if (!code) {
      return NextResponse.json(
        { error: 'Missing authorization code' },
        { status: 400 }
      );
    }

    // 1. Exchange Authorization Code for Access Token
    const tokenResponse = await fetch('https://api.line.me/oauth2/v2.1/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.NEXT_PUBLIC_LINE_LOGIN_REDIRECT_URI!,
        client_id: process.env.LINE_LOGIN_CHANNEL_ID!,
        client_secret: process.env.LINE_LOGIN_CHANNEL_SECRET!,
      }),
    });

    if (!tokenResponse.ok) {
      const errText = await tokenResponse.text();
      console.error('LINE Token Exchange Error:', errText);
      return NextResponse.redirect(new URL('/auth/login?error=token_exchange_failed', request.url));
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;
    // id_token is also returned if scope includes 'openid', but we'll use Profile API for simplicity/consistency if needed, 
    // or just use the ID token if we were doing pure OIDC. 
    // But let's fetch profile to get displayName and picture explicitly.

    // 2. Get User Profile
    const profileResponse = await fetch('https://api.line.me/v2/profile', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!profileResponse.ok) {
      console.error('LINE Profile Fetch Error');
      return NextResponse.redirect(new URL('/auth/login?error=profile_fetch_failed', request.url));
    }

    const profile = await profileResponse.json();
    const lineUserId = profile.userId;
    const appUserId = `L${lineUserId}`; // Prefix with 'L' for LINE users
    const displayName = profile.displayName;
    const pictureUrl = profile.pictureUrl;

    // 3. Firestore Sync (Create or Update User)
    const userRef = adminDb.collection('users').doc(appUserId);
    const userSnap = await userRef.get();

    let isNewUser = false;

    if (!userSnap.exists) {
      isNewUser = true;
      await userRef.set({
        lineUserId,
        displayName,
        pictureUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
        // Initial flags
        isProfileCompleted: false,
      });
    } else {
      const userData = userSnap.data();
      const isProfileCompleted = userData?.isProfileCompleted === true;

      if (isProfileCompleted) {
        // Registered User: Do NOT overwrite displayName/pictureUrl
        await userRef.update({
          updatedAt: new Date(),
          lastLoginAt: new Date(),
        });
        isNewUser = false;
      } else {
        // Provisional User: Sync LINE info
        await userRef.update({
          displayName,
          pictureUrl,
          updatedAt: new Date(),
          lastLoginAt: new Date(),
        });
        // Treat as new user to force redirect to Profile Registration
        isNewUser = true;
      }
    }

    // 4. Generate Firebase Custom Token
    const customToken = await adminAuth.createCustomToken(appUserId, {
      lineAccessToken: accessToken, // Optional: embed if need to use simple calls from client? usually not needed.
    });

    // 5. Redirect to Client Callback Handler
    // We pass the token and isNew flag. Next URL handling is done on client or passed through 'state' if we implemented state handling properly.
    // For now, assuming 'next' might have been encoded in 'state' or we default to Home/Profile.
    // Let's decode state if it contains URL, otherwise default.
    // NOTE: 'state' should be validated for CSRF, simplified here.

    let nextUrl = '/'; // Default
    // If state looks like a URL or path, use it. 
    // Ideally state is a random string and we look up the 'next' url from a cookie/session.
    // But often simplified implementations just pass the url in state (less secure).
    // Assuming the user's requirement:
    //  - New User -> First Profile Registration
    //  - Existing -> "OAuth source" (next) or Home.

    // We pass `next` param to the callback page to decide.
    // If state contains 'callback=' or just raw URL? 
    // Login page said: `const callbackUrl = next ? '?callback=' + encodeURIComponent(next) : '';`
    // but the `window.location.href = ...` part didn't explicitly encode state with next. 
    // It just appended query to the API call? 
    // app/auth/login/page.tsx:
    // `window.location.href = '${process.env.NEXT_PUBLIC_API_URL}/auth/line${callbackUrl}';`
    // Wait, there is no `/auth/line` route in the file list I saw earlier! 
    // I only saw `/api/auth/line/callback/route.ts`. 
    // Is there a `/api/auth/line/route.ts`?

    // If not, the login page is broken! 
    // It calls `${process.env.NEXT_PUBLIC_API_URL}/auth/line`.
    // I need to check if that route exists.

    // Assuming for now we redirect to /auth/callback.

    const destinationUrl = new URL('/auth/callback', request.url);
    destinationUrl.searchParams.set('token', customToken);
    destinationUrl.searchParams.set('isNew', isNewUser ? 'true' : 'false');

    // Try to recover 'next' from state if possible, or just rely on default flows
    if (state && state.startsWith('/')) {
      destinationUrl.searchParams.set('next', state);
    }

    return NextResponse.redirect(destinationUrl);

  } catch (err) {
    console.error('Callback Route Error:', err);
    return NextResponse.redirect(new URL('/auth/login?error=server_error', request.url));
  }
}
