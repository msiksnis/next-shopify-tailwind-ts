import { FC } from "react";
import Link from "next/link";
import { Bag as Cart, Heart } from "@components/icons";
import { useUi } from "@components/ui/context";

const Usernav: FC = () => {
  const { openSidebar } = useUi();
  return (
    <nav>
      <ul className="flex ml-14 space-x-6">
        <li
          className="flex cursor-pointer transition items-center
          outline-none text-primary hover:scale-110"
        >
          <Cart onClick={openSidebar} />
        </li>
        <li
          className="flex cursor-pointer transition items-center
          outline-none text-primary hover:scale-110"
        >
          <Link href="/wishlist">
            <Heart />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Usernav;
