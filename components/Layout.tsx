import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen container mx-auto">
      <Header />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
};
