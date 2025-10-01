import clsx from "clsx";

type HeaderLinksProps = {
  className?: string;
};

const HeaderLinks = ({ className }: HeaderLinksProps) => {
  return (
    <nav className={clsx(className, "flex justify-center space-x-4")}>
      <a href="/" className="font-medium px-3 py-2 hover:underline">
        Главная
      </a>
      <a href="/catalog" className="font-medium px-3 py-2 hover:underline">
        Каталог
      </a>
      <a href="/about" className="font-medium px-3 py-2 hover:underline">
        Обо мне
      </a>
    </nav>
  );
};

export default HeaderLinks;
