import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./Components/NavBar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

      <body>
        <NavBar>
        </NavBar>
        {children}
        
      </body>

    </html>
  );
}
