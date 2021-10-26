import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import s from "./Button.module.css";

interface Props extends ButtonHTMLAttributes<HTMLElement> {
  children: ReactNode | ReactNode[];
}

const Button: FC<Props> = ({ children, ...rest }) => {
  return (
    <button type="button" {...rest} className={s.root}>
      {children}
    </button>
  );
};

export default Button;
