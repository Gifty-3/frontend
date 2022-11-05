import React, { FC, ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children?: ReactNode;
}

const Layout: FC<LayoutProps> = (props) => {
  const { children } = props;

  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="w-full px-[10rem] self-center pt-10 pb-14 backdrop:blur-md">
        <Navbar />
      </div>
      {children}
    </div>
  );
};
export default Layout;
