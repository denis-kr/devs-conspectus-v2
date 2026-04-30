import { Header } from "../header";
import { Footer } from "../footer";
import { Outlet } from "react-router";
import type { ReactNode } from "react";

type RootLayoutProps = {
  children: ReactNode;
};

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl">{children}</main>
      <Footer />
    </div>
  );
}

export default function Layout() {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
}
