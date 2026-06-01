import { useFetchUserProfile } from "@/hooks/react-query-hooks/useFetchUserProfile";
import LoadingPage from "@/Pages/Loading";
import { Navigate, Outlet } from "react-router";



export function ProtectedRoute() {

    const { data: response, isLoading, isError } = useFetchUserProfile();

    if (isLoading) return <LoadingPage />
    else if (isError || !response) return <Navigate to={'/sign-in'} replace />
    return <Outlet />
}