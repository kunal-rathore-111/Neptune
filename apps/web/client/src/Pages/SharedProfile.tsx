import { useDispatch } from "react-redux";
import Dashboard from "./Dashboard";
import { useLayoutEffect } from "react";
import { setIsSharedProfileRouteHash } from "@/store/uiSlice";
import ErrorPage from "./ErrorPage";
import { useParams } from "react-router";

export default function SharedProfile() {

  const { hash } = useParams();


  if (!hash)
    return <ErrorPage message="Hash key not found" />

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(setIsSharedProfileRouteHash(hash));
  }, [])

  return <Dashboard />;
}
