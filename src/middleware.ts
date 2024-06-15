import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
]);

const isAgentRoute = createRouteMatcher([
  '/dashboard/agent(.*)',
  '/auth/agent(.*)',
]);

const isUserRoute = createRouteMatcher([
  '/dashboard/user(.*)',
  '/auth/user(.*)',
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    if (isUserRoute(req)) {
      auth({ redirectUrl: '/auth/user/login' }).protect();
    } else if(isAgentRoute(req)) {
      auth({ redirectUrl: '/auth/agent/login' }).protect();
    }
  }
});
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
