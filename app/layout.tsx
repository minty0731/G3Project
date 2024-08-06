'use client'
import React, { useEffect, useState } from "react";
import "./globals.css";
import { Navbar, Footer } from "@/components";
import { AuthProvider } from "@/container/AuthContext";
import Loading from "./loading";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading effect (replace with actual data fetching logic)
    setTimeout(() => {
      setLoading(false); // Set loading to false after components are fully loaded
    }, 300); // Adjust the timeout as per your actual loading needs
  }, []);
  return (
    <html lang="en">
      <head>
        {/* Include metadata and other head elements here if necessary */}
        <title>Vegan Review</title>
      </head>
      <AuthProvider>
        <body>
          <Navbar />
          <main className="mt-24">{children}</main>
          <Footer />
        </body>
      </AuthProvider>
    </html>
  );
}
