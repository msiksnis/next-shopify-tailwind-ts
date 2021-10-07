import { Product } from "@common/types/product";
import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

interface Props {
  product: Product;
}

const placeholderImage = "/product-image-placeholder.svg";
const ProductCard: FC<Props> = ({ product }) => {
  return (
    <div className="inset-0 z-0 bg-[#FFFAF6]">
      <Link href={`/products/${product.slug}`}>
        <a className="root relative text-2xl tracking-[0.4px]">
          <div className="tag absolute top-0 left-0 z-20">
            <h3 className="title flex font-bold leading-9 sm:truncate">
              <span className="py-4 px-6">{product.name}</span>
            </h3>
            <span className="price pb-4 pt-2 px-6 font-semibold text-sm tracking-[0.4px]">
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
        </a>
      </Link>
    </div>
  );
};

export default ProductCard;
