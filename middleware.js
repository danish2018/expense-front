// Next Imports
import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

// Constants
const DEFAULT_HOME_PAGE_URL = "/";

const redirect = (url, request) => {
  const redirectUrl = new URL(url, request.url).toString();
  return NextResponse.redirect(redirectUrl);
};

export default withAuth(
  async function middleware(request) {
    const pathname = request.nextUrl.pathname;

    // If the user is logged in, `token` will be an object containing the user's details
    const token = request.nextauth.token;

    // Check if the user is logged in
    const isUserLoggedIn = !!token;

    // Check if the user is an admin
    const isAdmin = token?.user_role === "Admin";

    // Guest routes (Routes that can be accessed by guest users who are not logged in)
    const guestRoutes = ["login", "signup", "forgot-password"];

    // Shared routes (Routes that can be accessed by both guest and logged in users)
    const sharedRoutes = ["shared-route"];

    // Admin routes (Routes that can only be accessed by admin users)
    const adminRoutes = ["/hospital-admin"];

    // Private routes (All routes except guest and shared routes that can only be accessed by logged in users)
    const isPrivateRoute = ![
      ...guestRoutes,
      ...sharedRoutes,
      ...adminRoutes,
    ].some((route) => pathname.endsWith(route));

    // If the user is not logged in and is trying to access a private or admin route, redirect to the login page
    if (
      !isUserLoggedIn &&
      (isPrivateRoute || adminRoutes.some((route) => pathname.endsWith(route)))
    ) {
      return redirect("/login", request);
    }

    // If the user is logged in and is trying to access a guest route, redirect to the default home page
    const isRequestedRouteGuestRoute = guestRoutes.some((route) =>
      pathname.endsWith(route)
    );
    if (isUserLoggedIn && isRequestedRouteGuestRoute) {
      return redirect(DEFAULT_HOME_PAGE_URL, request);
    }

    // If the user is logged in but is not an admin and is trying to access an admin route, redirect to the default home page
    const isRequestedRouteAdminRoute = adminRoutes.some((route) =>
      pathname.endsWith(route)
    );
    if (isUserLoggedIn && !isAdmin && isRequestedRouteAdminRoute) {
      return redirect(DEFAULT_HOME_PAGE_URL, request);
    }

    // If the user is logged in and trying to access a private route, allow access
    if (isUserLoggedIn && isPrivateRoute) {
      return NextResponse.next();
    }

    // Default to allowing access to shared routes
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true;
      },
    },
  }
);

// Matcher Config
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - all items inside the public folder
     *    - images (public images)
     *    - next.svg (Next.js logo)
     *    - vercel.svg (Vercel logo)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.+?/hook-examples|.+?/menu-examples|images|next.svg|vercel.svg).*)",
  ],
};

// // Next Imports
// import { NextResponse } from 'next/server'

// import { withAuth } from 'next-auth/middleware'

// // Constants
// const DEFAULT_HOME_PAGE_URL = '/'

// const redirect = (url, request) => {
//   const redirectUrl = new URL(url, request.url).toString()
//   return NextResponse.redirect(redirectUrl)
// }

// export default withAuth(
//   async function middleware(request) {
//     const pathname = request.nextUrl.pathname

//     // If the user is logged in, `token` will be an object containing the user's details
//     const token = request.nextauth.token

//     // Check if the user is logged in
//     const isUserLoggedIn = !!token

//     // Guest routes (Routes that can be accessed by guest users who are not logged in)
//     const guestRoutes = ['login', 'signup', 'forgot-password']

//     // Shared routes (Routes that can be accessed by both guest and logged in users)
//     const sharedRoutes = ['shared-route']

//     // Private routes (All routes except guest and shared routes that can only be accessed by logged in users)
//     const isPrivateRoute = ![...guestRoutes, ...sharedRoutes].some(route => pathname.endsWith(route))

//     // If the user is not logged in and is trying to access a private route, redirect to the login page
//     if (!isUserLoggedIn && isPrivateRoute) {
//       const redirectUrl = '/login'
//       return redirect(redirectUrl, request)
//     }

//     // If the user is logged in and is trying to access a guest route, redirect to the root page
//     const isRequestedRouteGuestRoute = guestRoutes.some(route => pathname.endsWith(route))

//     if (isUserLoggedIn && isRequestedRouteGuestRoute) {
//       return redirect(DEFAULT_HOME_PAGE_URL, request)
//     }

//     // If the user is logged in and is trying to access root page, redirect to the home page
//     // if (pathname === '/' || pathname === '/') {
//     //   return redirect(DEFAULT_HOME_PAGE_URL, request)
//     // }

//     // If pathname already contains a locale, return next() else redirect with localized URL
//     return NextResponse.next()
//   },
//   {
//     callbacks: {
//       authorized: () => {
//         // This is a work-around for handling redirect on auth pages.
//         // We return true here so that the middleware function above
//         // is always called.
//         return true
//       }
//     }
//   }
// )

// // Matcher Config
// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - all items inside the public folder
//      *    - images (public images)
//      *    - next.svg (Next.js logo)
//      *    - vercel.svg (Vercel logo)
//      */
//     '/((?!api|_next/static|_next/image|favicon.ico|.+?/hook-examples|.+?/menu-examples|images|next.svg|vercel.svg).*)'
//   ]
// }
