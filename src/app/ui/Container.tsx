import clsx from "clsx";

type ContainerProps = {
  children?: React.ReactNode;
  className?: string;
};

const Container = ({ children, className }: ContainerProps) => {
  return <div className={clsx(className, "xl:container mx-auto")}>{children}</div>;
};

export default Container;
