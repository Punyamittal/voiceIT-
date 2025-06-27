"use client";

import Loader from '@/components/Loader';

export default function Loading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-primary-bg">
      <Loader />
    </div>
  );
} 