import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-in", "/sign-up", "/"]);

export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req) && auth().userId) {
    let path = "/select-org";
    if (auth().orgId) {
      path = `/organization/${auth().orgId}`;
    }
    const org = new URL(path, req.url);
    return NextResponse.redirect(org);
  }
  if (!isPublicRoute(req) && !auth().userId) {
    const org = new URL("/sign-in", req.url);
    return NextResponse.redirect(org);
  }

  if (
    auth().userId &&
    !auth().orgId &&
    req.nextUrl.pathname !== "/select-org"
  ) {
    const org = new URL("/select-org", req.url);
    return NextResponse.redirect(org);
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
