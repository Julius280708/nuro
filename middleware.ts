// src/middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()

export const config = {
  matcher: [
    // Match routes you want to protect or track auth on:
    '/((?!_next|.*\\..*|favicon.ico).*)',
    '/(api|trpc)(.*)',
  ],
}