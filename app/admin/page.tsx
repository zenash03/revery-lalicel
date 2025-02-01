"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { account } from "@/lib/appwrite";
import Sidebar from '@/components/Sidebar';
import MainContent from '@/components/MainContent';

type Props = {};

const AdminPage = ({}: Props) => {
  const [loggedInUser, setLoggedInUser] = useState<any | null>(null);
  const [selectedEntity, setSelectedEntity] = useState<string>('flowers');
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const session = sessionStorage.getItem("sessionRevery");
      if (session) {
        try {
          const user = await account.get();
          setLoggedInUser(user);
        } catch (error) {
          setLoggedInUser(null);
          sessionStorage.removeItem("sessionRevery");
          router.push("/admin/login"); // Redirect to login page if not logged in
        }
      } else {
        router.push("/admin/login"); // Redirect to login page if no session
      }
    };
    checkSession();
  }, [router]);

  const handleEntityChange = (entity: string) => {
    setSelectedEntity(entity);
  };

  if (!loggedInUser) {
    return null; // Render nothing while redirecting
  }

  return (
    <div className="flex min-h-screen">
      <MainContent selectedEntity={selectedEntity} />
    </div>
  );
};

export default AdminPage;