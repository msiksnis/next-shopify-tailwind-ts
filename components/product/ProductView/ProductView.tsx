import React, { FC, useState } from "react";
import Image from "next/image";
import { Product } from "@common/types/product";
import ProductSlider from "../ProductSlider/ProductSlider";
import Button from "@components/ui/Button/Button";
import Swatch from "../Swatch/Swatch";
import { Choices, getVariant } from "../helpers";
import { useUi } from "@components/ui/context";
import useAddItem from "@framework/cart/use-add-item";

interface Props {
  product: Product;
}

const ProductView: FC<Props> = ({ product }) => {
  const [choices, setChoices] = useState<Choices>({});
  const { openSidebar } = useUi();
  const addItem = useAddItem();

  const variant = getVariant(product, choices);
  const addToCard = async () => {
    try {
      const item = {
        productId: String(product.id),
        variantId: variant.id,
        variantOption: variant?.options,
      };

      const output = await addItem(item);
      alert(JSON.stringify(output));
      openSidebar();
    } catch {}
  };

  return (
    <div>
      <div
        className="relative grid items-start gap-8 grid-cols-1 lg:grid-cols-12
        overflow-x-hidden m-5"
      >
        <div className="relative flex col-span-1 bg-violet  lg:col-span-6">
          <div className="absolute top-6 left-0 z-20 pr-16 lg:left-6">
            <h1
              className="px-6 py-2 font-bold text-xl lg:text-3xl
              bg-violet-light text-white"
            >
              {product.name}
            </h1>
            <div
              className="px-6 py-2 pb-4 font-bold inline-block
              tracking-wide bg-violet-light text-white"
            >
              {product.price.value}
              {` `}
              {product.price.currencyCode}
            </div>
          </div>
          <ProductSlider>
            {product.images.map((image) => (
              <div key={image.url} className="h-full">
                <Image
                  className="img"
                  src={image.url}
                  alt={image.alt}
                  width={1050}
                  height={1050}
                  quality="85"
                />
              </div>
            ))}
          </ProductSlider>
        </div>
        <div
          className="flex flex-col col-span-1 mx-auto max-w-8xl px-6 w-full
          h-full lg:col-span-6 lg:py-24 lg:justify-between"
        >
          <section>
            {product.options.map((option) => (
              <div key={option.id} className="pb-4">
                <h2 className="uppercase font-medium">{option.displayName}</h2>
                <div className="flex flex-row py-4">
                  {option.values.map((value) => {
                    const activeChoice =
                      choices[option.displayName.toLowerCase()];

                    return (
                      <Swatch
                        key={`${option.id}-${value.label}`}
                        label={value.label}
                        color={value.hexColor}
                        variant={option.displayName}
                        active={value.label.toLowerCase() === activeChoice}
                        onClick={() => {
                          setChoices({
                            ...choices,
                            [option.displayName.toLowerCase()]:
                              value.label.toLowerCase(),
                          });
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
            <div className="pb-14 break-words w-full max-w-xl text-lg">
              {product.description}
            </div>
          </section>
          <div>
            <Button onClick={addToCard}>Add to Cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
