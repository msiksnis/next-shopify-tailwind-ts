import { FC, ReactNode } from "react";
import Ticker from "react-ticker";
import cn from "classnames";

interface Props {
  children: ReactNode[];
  variant?: "primary" | "secondary";
}

const Marquee: FC<Props> = ({ children, variant = "primary" }) => {
  const rootClassName = cn("bg-black", {
    "bg-white": variant === "secondary",
  });
  return (
    <div className={rootClassName}>
      <Ticker speed={2}>
        {() => <div className="blabla relative">{children}</div>}
      </Ticker>
    </div>
  );
};

export default Marquee;
