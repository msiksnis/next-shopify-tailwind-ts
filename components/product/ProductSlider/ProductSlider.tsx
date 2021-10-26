import React, { FC, Children, isValidElement, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";

const ProductSlider: FC = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, slider] = useKeenSlider({
    initial: 0,
    loop: true,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
  });

  return (
    <div className="relative w-full h-full overflow-y-hidden group">
      <div
        ref={sliderRef as React.RefObject<HTMLDivElement>}
        className="keen-slider h-full transition-opacity"
      >
        <div
          className="absolute top-1/2 -translate-x-1/2 z-20 w-10 h-10
          items-center justify-center bg-hover-1 rounded-full hover:bg-hover-2
          hover:outline-none bg-cover left-10 hidden group-hover:flex opacity-50
          hover:opacity-90 hover:scale-110 transition ease-in-out cursor-pointer"
        >
          <Image
            onClick={slider?.prev}
            src={"/cursor-left.png"}
            width="50"
            height="50"
          />
        </div>
        <div
          className="absolute top-1/2 -translate-x-1/2 z-20 w-10 h-10
          items-center justify-center bg-hover-1 rounded-full hover:bg-hover-2
          hover:outline-none bg-cover right-0 hidden group-hover:flex opacity-50
          hover:opacity-90 hover:scale-110 transition ease-in-out cursor-pointer"
        >
          <Image
            onClick={slider?.next}
            src={"/cursor-right.png"}
            width="50"
            height="50"
          />
        </div>
        {Children.map(children, (child) => {
          if (isValidElement(child)) {
            return React.cloneElement(child, {
              className: `${
                child.props.className ? `${child.props.className}` : ""
              } keen-slider__slide`,
            });
          }
          return child;
        })}
      </div>
    </div>
  );
};

export default ProductSlider;
