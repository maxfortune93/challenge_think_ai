import type { Metadata } from "next";
import "./globals.css";
import { ResponsiveAppBar } from "@/components";

export const metadata: Metadata = {
  title: "Cats Lovers",
  description: "Personilize your cat Image",
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={'relative'}>
        <ResponsiveAppBar/>
        {children}
      </body>
    </html>
  );
}
