import { Product } from "@common/types/product";
import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

interface Props {
  product: Product;
  variant?: "simple" | "slim";
}

const placeholderImage = "/product-image-placeholder.svg";

const ProductCard: FC<Props> = ({ product, variant = "simple" }) => {
  return (
    <div className="inset-0 z-0">
      <Link href={`/products/${product.slug}`}>
        <a className="relative text-2xl tracking-[0.4px]">
          {variant === "slim" ? (
            <div className="bg-[#FFFAF6]">
              <div className="flex items-center justify-center h-[320px] w-[320px] absolute z-20">
                <span className="bg-black/50 text-white p-3 font-bold text-xl">
                  {product.name}
                </span>
              </div>
              {product.images && (
                <Image
                  className="transform hover:scale-105 transition duration-300 ease-in-out"
                  alt={product.name ?? "Product Image"}
                  src={product.images[0].url ?? placeholderImage}
                  height={320}
                  width={320}
                  quality="85"
                  layout="fixed"
                />
              )}
            </div>
          ) : (
            <div className="bg-[#ffeee0] hover:bg-[#ffdbbf] rounded-lg">
              <div className="absolute top-0 left-0 z-20">
                <h3 className="flex font-bold leading-9 sm:truncate">
                  <span className="py-4 px-6">{product.name}</span>
                </h3>
                <span className="pb-4 pt-2 px-6 font-semibold text-sm tracking-[0.4px]">
                  {product.price.value}
                  {product.price.currencyCode}
                </span>
              </div>
              {product.images && (
                <Image
                  className="transform hover:scale-105 transition duration-300 ease-in-out"
                  alt={product.name ?? "Product Image"}
                  src={product.images[0].url ?? placeholderImage}
                  height={320}
                  width={320}
                  quality="85"
                  layout="responsive"
                />
              )}
            </div>
          )}
        </a>
      </Link>
    </div>
  );
};

export default ProductCard;
