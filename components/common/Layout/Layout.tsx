import React, { FC } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../../ui/Sidebar/Sidebar";
import CartSidebar from "../../cart/CartSidebar/CartSidebar";
import { useUi } from "@components/ui/context";

const Layout: FC = ({ children }) => {
  const { isSidebarOpen, closeSidebar } = useUi();

  return (
    <div className="">
      <Navbar />
      <Sidebar onClose={closeSidebar} isOpen={isSidebarOpen}>
        <CartSidebar />
      </Sidebar>
      <main className="bg-primary h-full mx-auto max-w-[2460px]">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
