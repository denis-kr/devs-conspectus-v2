import { Header } from "../header";
import { Footer } from "../footer";
import { Outlet } from "react-router";
import type { ReactNode } from "react";
import { containerClasses } from "../../utils/styling";
import cx from "classnames";

type RootLayoutProps = {
  children: ReactNode;
};

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col mx-2 sm:mx-4">
      <Header />
      <main className="flex-1">
        <div className={cx("my-3", containerClasses)}>{children}</div>
      </main>
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
