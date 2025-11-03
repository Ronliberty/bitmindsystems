import "./globals.css";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "BitMind Systems",
  description: "Secure login entry to BitMind Systems",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* ✅ Move ThemeProvider + AuthProvider into a Client Component */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

// Create a separate client component for providers
function Providers({ children }: { children: React.ReactNode }) {
  "use client";

  return (
    <AuthProvider>
      <ThemeProvider attribute="class" enableSystem defaultTheme="system">
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
}
