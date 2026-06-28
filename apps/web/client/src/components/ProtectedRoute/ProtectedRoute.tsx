import { Navigate, Outlet, useLocation } from "react-router";



export function ProtectedRoute() {

    const location = useLocation();

    const hasSessionCookie = document.cookie.includes('hasTokenCookie'); // check is token variable present (handle if fake token present in the backend by jwt validation)

    const isSignPage = location.pathname.startsWith('/sign'); // get if page is sign-in or sign-up


    const isResetPasswordPage = location.pathname.includes('/reset-password')

    const hasForgotPasswordCookie = document.cookie.includes('hasForgotPasswordCookie')



    // check
    if (isResetPasswordPage) {
        // only check the forgot password cookie for reset page
        if (!hasForgotPasswordCookie) return <Navigate to={'/sign-in'} replace />
        return <Outlet />
    }

    if (!hasSessionCookie && !isSignPage) // return to sign-in
        return <Navigate to={'/sign-in'} replace />

    else if (hasSessionCookie && isSignPage)
        return <Navigate to={'/user/dashboard'} replace /> // if at sign-in and already have cookie then redirect to dashboard
    else
        return <Outlet />
}