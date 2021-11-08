import { FC } from "react";
import Link from "next/link";
import { Bag as Cart, Heart } from "@components/icons";
import { useUi } from "@components/ui/context";
import useCart from "@framework/cart/use-cart";
import { LineItem } from "@common/types/cart";

const Usernav: FC = () => {
  const { openSidebar } = useUi();
  const { data } = useCart();

  const itemsCount =
    data?.lineItems.reduce((count: number, item: LineItem) => {
      return count + item.quantity;
    }, 0) ?? 0;

  return (
    <nav>
      <ul className="flex ml-14 space-x-6">
        <li
          className="group relative flex cursor-pointer transition items-center
          outline-none text-primary hover:scale-110"
        >
          <Cart onClick={openSidebar} />
          {itemsCount > 0 && (
            <span
              className="text-opacity-0 group-hover:text-opacity-100 text-xs text-white bg-purple-600
              rounded-full w-5 h-5 flex justify-center items-center absolute bottom-[10px] left-[10px]
              transform scale-[0.6] group-hover:scale-105 transition ease-in-out duration-300"
            >
              {itemsCount}
            </span>
          )}
        </li>
        <li
          className="flex cursor-pointer transition items-center
          outline-none text-primary hover:scale-110"
        >
          <Link href="/wishlist">
            <a>
              <Heart />
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Usernav;
