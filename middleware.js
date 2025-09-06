import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req) {
        // You can add custom logic here if needed, for example, role-based access
        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
    }
)

export const config = { 
    matcher: ["/admin/:path((?!login).*)", "/dashboard"],
}
