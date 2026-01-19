import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const GameCardContainer = ({ children }: Props) => {
  return <div className="overflow-hidden rounded-xl bg-slate-100 shadow-sm dark:bg-slate-800">{children}</div>;
};

export default GameCardContainer;
