import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Navbar } from "../components/layout/Navbar";
import { Sidebar } from "../components/layout/Sidebar";
import { MobileNav } from "../components/layout/MobileNav";
import { ToastContainer } from "../components/common/Toast";
import { LoadingState } from "../components/common/LoadingState";

export const CandidateLayout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingState message="Verifying candidate session..." />;
  }

  if (!user || user.role !== "candidate") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#f7f5ef] dark:bg-[#1e201d] text-stone-900 dark:text-stone-100 flex flex-col">
      <Navbar role="candidate" />
      <div className="flex-1 flex">
        <Sidebar role="candidate" />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto w-full pb-20 lg:pb-8">
          <Outlet />
        </main>
      </div>
      <MobileNav role="candidate" />
      <ToastContainer />
    </div>
  );
};