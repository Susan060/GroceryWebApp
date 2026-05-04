import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/Provider";
import StoreProvider from "@/redux/StoreProvider";
import InitUser from "@/InitUser";



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
      <body className="w-full min-h-screen  bg-linear-to-b from-green-100 to-white">
        <Provider>
          <StoreProvider>
            <InitUser />
            {children}
          </StoreProvider>
        </Provider>
        <script
          src="https://bot-assist-khaki.vercel.app/chatBot.js"
          data-owner-id="usr_123879224544068099">
        </script>
      </body>
    </html>
  );
}
