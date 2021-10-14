import { FC } from "react";
import Link from "next/link";
import Usernav from "./Usernav";

const Navbar: FC = () => {
  return (
    <div className="flex items-center justify-between mx-20">
      <div className="flex md:py-6">
        <Link href="/">
          <a className="text-2xl font-bold">NEXT_STORE</a>
        </Link>
      </div>

      <nav className="flex ml-6 space-x-6">
        <Link href="/">
          <a className="text-accents-6 hover:text-accents-9 leading-6 font-medium transition">
            About
          </a>
        </Link>
        <Link href="/">
          <a className="text-accents-6 hover:text-accents-9 leading-6 font-medium transition">
            Portfolio
          </a>
        </Link>
        <Link href="/">
          <a className="text-accents-6 hover:text-accents-9 leading-6 font-medium transition">
            Store
          </a>
        </Link>
        <Link href="/">
          <a className="text-accents-6 hover:text-accents-9 leading-6 font-medium transition">
            Contact
          </a>
        </Link>
        <div className="">
          <Usernav />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
