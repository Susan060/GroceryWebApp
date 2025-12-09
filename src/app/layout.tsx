import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/Provider";


export const metadata: Metadata = {
  title: "Geocerygo | 10 minutes grocery delivery app",
  description: "10 minutes grocery delivery app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full min-h-screen  bg-gradient-to-b from-green-50 to-white">
        <Provider>
        {children}
        </Provider>
      </body>
    </html>
  );
}
