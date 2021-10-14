import { FC, ReactNode } from "react";
import cn from "classnames";

interface Props {
  children: ReactNode[];
  layout?: "A" | "B";
}

const Grid: FC<Props> = ({ children, layout = "A" }) => {
  const rootClassName = cn(
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2",
    {
      ["layoutA"]: layout === "A",
      ["layoutB"]: layout === "B",
    }
  );
  return <div className={rootClassName}>{children}</div>;
};

export default Grid;
