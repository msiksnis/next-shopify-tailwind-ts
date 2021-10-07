import { FC, ReactNode } from "react";
import cn from "classnames";

interface Props {
  children: ReactNode[];
  layout?: "A" | "B";
}

const Grid: FC<Props> = ({ children, layout = "A" }) => {
  const rootClassName = cn(
    "grid grid-cols-1 gap-4 lg:grid-cols-3 lg:grid-rows-2",
    {
      ["layoutA"]: layout === "A",
      ["text-blue"]: layout === "B",
    }
  );
  return <div className={rootClassName}>{children}</div>;
};

export default Grid;
