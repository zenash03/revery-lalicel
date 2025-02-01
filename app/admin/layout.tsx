"use client";
import React from 'react';
import Sidebar from '@/components/Sidebar';

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}