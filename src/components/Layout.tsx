import { ReactNode } from "react";
import Header from "@/components/header";
import AuthProvider from "@/providers/AuthProvider";
import Navbar from "./navbar";
import StorageProvider from "@/providers/StorageProvider";
import CartBottom from "./cartBottom";
import Cart from "./cart";
import { useAuth } from "@/hooks/useAuth";

interface LayoutProps {
  children: ReactNode;
}

function LayoutContent({ children }: LayoutProps) {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && (
        <Header>
          <Navbar />
        </Header>
      )}
      {children}
      {isAuthenticated && (
        <>
          <CartBottom />
          <Cart />
        </>
      )}
    </>
  );
}

export default function Layout({ children }: LayoutProps) {
  return (
    <AuthProvider>
      <StorageProvider>
        <LayoutContent>{children}</LayoutContent>
      </StorageProvider>
    </AuthProvider>
  );
}
