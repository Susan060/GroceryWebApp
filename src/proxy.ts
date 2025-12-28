// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";

// export async function proxy(req: NextRequest) {
//     const { pathname } = req.nextUrl
//     const publicRoutes = ["/login", "/register", "/api/auth", "/favicon.ico", "/_next"]
//     if (publicRoutes.some((path) => pathname.startsWith(path))) {
//         return NextResponse.next()
//     }
//     const token = await getToken({ req, secret: process.env.AUTH_SECRET })
//     console.log(token)
//     console.log(req.url)
//     if (!token) {
//         const loginUrl = new URL("/login", req.url)
//         loginUrl.searchParams.set("callbackurl", req.url)
//         console.log(loginUrl)
//         return NextResponse.redirect(loginUrl)
//     }
//     const role = token.role
//     if (pathname.startsWith("/user") && role !== "user") {
//         return NextResponse.redirect(new URL("/unauthorized", req.url))
//     }
//     if (pathname.startsWith("/delivery") && role !== "deliveryBoy") {
//         return NextResponse.redirect(new URL("/unauthorized", req.url))
//     } if (pathname.startsWith("/admin") && role !== "admin") {
//         return NextResponse.redirect(new URL("/unauthorized", req.url))
//     }

//     return NextResponse.next()
// }

// export const config = {
//     // matcher: '/((?!api/_next/static|_next/image|favicon.ico).*)'
//       matcher: [
//     // Match all routes except:
//     '/((?!_next/static|_next/image|favicon.ico|api/auth).*)',
//   ]
// }


// for webhook stripe
// import { getToken } from "next-auth/jwt"
// import { NextRequest, NextResponse } from "next/server"

// export async function proxy(req: NextRequest) {
//   const { pathname } = req.nextUrl

//   // ✅ Allow Stripe webhook WITHOUT auth
//   if (pathname === "/api/user/stripe/webhook") {
//     return NextResponse.next()
//   }

//   const publicRoutes = [
//     "/login",
//     "/register",
//     "/api/auth",
//     "/favicon.ico",
//     "/_next",
//   ]

//   if (publicRoutes.some((path) => pathname.startsWith(path))) {
//     return NextResponse.next()
//   }

//   const token = await getToken({
//     req,
//     secret: process.env.AUTH_SECRET,
//   })

//   if (!token) {
//     const loginUrl = new URL("/login", req.url)
//     loginUrl.searchParams.set("callbackurl", req.url)
//     return NextResponse.redirect(loginUrl)
//   }

//   const role = token.role

//   if (pathname.startsWith("/user") && role !== "user") {
//     return NextResponse.redirect(new URL("/unauthorized", req.url))
//   }

//   if (pathname.startsWith("/delivery") && role !== "deliveryBoy") {
//     return NextResponse.redirect(new URL("/unauthorized", req.url))
//   }

//   if (pathname.startsWith("/admin") && role !== "admin") {
//     return NextResponse.redirect(new URL("/unauthorized", req.url))
//   }

//   return NextResponse.next()
// }
// export const config = {
//   matcher: [
//     '/((?!_next/static|_next/image|favicon.ico|api/auth|api/user/stripe/webhook).*)',
//   ],
// }

// for socket
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // ✅ Allow these APIs WITHOUT auth
  if (
    pathname === "/api/user/stripe/webhook" ||
    pathname.startsWith("/api/socket")
  ) {
    return NextResponse.next()
  }

  const publicRoutes = [
    "/login",
    "/register",
    "/api/auth",
    "/favicon.ico",
    "/_next",
  ]

  if (publicRoutes.some((path) => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  })

  if (!token) {
    const loginUrl = new URL("/login", req.url)
    loginUrl.searchParams.set("callbackurl", req.url)
    return NextResponse.redirect(loginUrl)
  }

  const role = token.role

  if (pathname.startsWith("/user") && role !== "user") {
    return NextResponse.redirect(new URL("/unauthorized", req.url))
  }

  if (pathname.startsWith("/delivery") && role !== "deliveryBoy") {
    return NextResponse.redirect(new URL("/unauthorized", req.url))
  }

  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/auth|api/user/stripe/webhook|api/socket).*)',
  ],
}


// import { getToken } from "next-auth/jwt"
// import { NextRequest, NextResponse } from "next/server"

// export async function proxy(req: NextRequest) {
//   const { pathname } = req.nextUrl

//   if (
//     pathname.startsWith("/api/auth") ||
//     pathname.startsWith("/_next") ||
//     pathname === "/favicon.ico"
//   ) {
//     return NextResponse.next()
//   }

//   const token = await getToken({
//     req,
//     secret: process.env.AUTH_SECRET,
//   })

//   if (!token) {
//     const loginUrl = new URL("/login", req.url)
//     loginUrl.searchParams.set("callbackUrl", req.url)
//     return NextResponse.redirect(loginUrl)
//   }

//   const role = token.role

//   if (pathname.startsWith("/admin") && role !== "admin") {
//     return NextResponse.redirect(new URL("/unauthorized", req.url))
//   }

//   return NextResponse.next()
// }
