import { FC } from "react";

const Layout: FC = ({ children }) => {
  return (
    <>
      <main className="bg-primary h-full mx-auto max-w-[2460px]">
        {children}
      </main>
    </>
  );
};

export default Layout;
