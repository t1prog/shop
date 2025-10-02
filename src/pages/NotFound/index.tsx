import { Link } from "react-router";
import clsx from "clsx";
import styles from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <div className={clsx(styles.NotFound, "gap-10 text-center select-none")}>
      <span className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black">Not Found</span>
      <Link
        to="/"
        className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black hover:opacity-80 transition-opacity"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
