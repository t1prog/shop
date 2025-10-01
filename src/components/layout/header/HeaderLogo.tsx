import clsx from "clsx";

type HeaderLogoProps = {
  className?: string;
};

const HeaderLogo = ({ className }: HeaderLogoProps) => {
  return (
    <div className={clsx(className, "flex flex-row justify-start select-none")}>
      <div className="">
        <span className="uppercase font-black text-9xl leading-24">s</span>
      </div>
      <div className="flex flex-col justify-center select-none">
        <span className="text-5xl uppercase font-black">omebody</span>
        <span className="text-5xl uppercase font-black">hop</span>
      </div>
    </div>
  );
};

export default HeaderLogo;
