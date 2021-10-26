import React, { FC } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../../ui/Sidebar/Sidebar";
import CartSidebar from "../../cart/CartSidebar/CartSidebar";
import { useUi } from "@components/ui/context";
import { ApiProvider } from "@framework";

const Layout: FC = ({ children }) => {
  const { isSidebarOpen, closeSidebar } = useUi();

  return (
    <ApiProvider>
      <div className="">
        <Navbar />
        <Sidebar onClose={closeSidebar} isOpen={isSidebarOpen}>
          <CartSidebar />
        </Sidebar>
        <main className="h-full mx-auto max-w-[2460px]">{children}</main>
        <Footer />
      </div>
    </ApiProvider>
  );
};

export default Layout;
