import { BrowserRouter, Route, Routes } from "react-router";
import Landing from "./Pages/Landing";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
const Dashboard = React.lazy(() => import("./Pages/Dashboard"));
const SharedProfile = React.lazy(() => import("./Pages/SharedProfile"));
const SharedContent = React.lazy(() => import("./Pages/SharedContent"));
const UserProfilePage = React.lazy(() => import("./Pages/UserProfile"));
import Docs from "./Pages/Docs";
import ErrorPage from "./Pages/ErrorPage";
const PrivacyPolicyPage = React.lazy(() => import("./Pages/PrivacyPolicy"));
const TermsofServicePage = React.lazy(() => import("./Pages/Terms"));
import ContactPage from "./Pages/Contact";
import { ScrollToTop } from "@repo/ui";
import React, { Suspense } from "react";
import LoadingPage from "./Pages/Loading";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <BrowserRouter>
        {/* whenever route change the ScrollToTop comp listen and perform scroll */}
        <Suspense fallback={<LoadingPage />}>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/sign-in" element={<Signin />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/user/dashboard" element={<Dashboard />} />
            <Route
              path="/user/public/shared/profile/:hash"
              element={<SharedProfile />}
            />
            <Route path="/user/profile" element={<UserProfilePage />} />
            <Route
              path="/user/public/shared/content/:content_share_hash"
              element={<SharedContent />}
            />
            <Route path="/docs" element={<Docs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsofServicePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
