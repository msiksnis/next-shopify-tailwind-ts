import { FC } from "react";

type HeroProps = {
  headline: string;
  description: string;
};

export const Hero: FC<HeroProps> = ({ headline, description }) => {
  return (
    <div className="">
      <div className="text-3xl">{headline}</div>
      <div className="text-xl">{description}</div>
    </div>
  );
};
