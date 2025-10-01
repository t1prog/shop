import { useTheme } from "@app/hooks/redux";
import Container from "@app/ui/Container";
import clsx from "clsx";
import styles from "./NotFound.module.scss";
import { storageSet } from "@app/utils/localStorage";

const NotFound = () => {
  // Это для пользовтелей что призли извне и сразу на notfound
  const theme = useTheme();
  storageSet("theme", theme);
  document.documentElement.setAttribute("data-theme", theme);

  return (
    <Container>
      <div className={clsx(styles.NotFound, "gap-10 text-center select-none")}>
        <span className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black">
          Not Found
        </span>
        <a
          href="/"
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black hover:opacity-80 transition-opacity"
        >
          Go Home
        </a>
      </div>
    </Container>
  );
};

export default NotFound;
