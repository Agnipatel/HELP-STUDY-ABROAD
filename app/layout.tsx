// app/layout.tsx
import "./globals.css";
import Providers from "./providers"; // client wrapper
import NavBar from "@/components/Navbar";

export const metadata = {
  title: "Admin App",
  description: "Demo app with Next.js + MUI + Zustand",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>
          <NavBar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
