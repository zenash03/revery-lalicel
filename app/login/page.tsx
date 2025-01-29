"use client";
import { useState } from "react";
import { account, ID } from "@/app/appwrite";
import Head from "next/head";

interface User {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [loggedInUser, setLoggedInUser] = useState<any | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const login = async ({ email, password }: User) => {
    const session = await account.createEmailPasswordSession(email, password);
    setLoggedInUser(await account.get());
  };

  const register = async () => {
    await account.create(ID.unique(), email, password, name);
    login({ email, password });
  };

  const logout = async () => {
    await account.deleteSession("current");
    setLoggedInUser(null);
  };

  if (loggedInUser) {
    return (
      <div className="font-custom flex flex-col items-center justify-center min-h-screen bg-pink-100">
        <Head>
          <link
            rel="stylesheet"
            href="/fonts/custom-font.css"
          />
        </Head>
        <p className="text-xl font-semibold text-green-700">Logged in as {loggedInUser.name}</p>
        <button
          type="button"
          onClick={logout}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="font-custom flex flex-col items-center justify-center min-h-screen bg-pink-100 text-gray-800">
      <Head>
        <link
          rel="stylesheet"
          href="/fonts/custom-font.css"
        />
      </Head>
      <p className="text-xl font-semibold text-red-700 mb-4">Not logged in</p>
      <form className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 px-4 py-2 border rounded w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 px-4 py-2 border rounded w-full"
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 px-4 py-2 border rounded w-full"
        />
        <button
          type="button"
          onClick={() => login({ email, password })}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-700 mb-2"
        >
          Login
        </button>
        <button
          type="button"
          onClick={register}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
