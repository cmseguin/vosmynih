import { FC, PropsWithChildren } from "react";

export const FloatingOutlet: FC<PropsWithChildren> = ({ children }) => {
  return <div>{children}</div>;
};
