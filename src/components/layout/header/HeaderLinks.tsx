import { Link } from "react-router";

import clsx from "clsx";

type HeaderLinksProps = {
  className?: string;
};

const HeaderLinks = ({ className }: HeaderLinksProps) => {
  return (
    <nav className={clsx(className, "flex justify-center space-x-4")}>
      <Link to="/" className="font-medium px-3 py-2 hover:underline">
        Главная
      </Link>
      <Link to="/catalog" className="font-medium px-3 py-2 hover:underline">
        Каталог
      </Link>
      <Link to="/about" className="font-medium px-3 py-2 hover:underline">
        Обо мне
      </Link>
    </nav>
  );
};

export default HeaderLinks;
