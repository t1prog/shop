import HeaderLogo from "./HeaderLogo";
import HeaderSearch from "./HeaderSearch";
import HeaderLinks from "./HeaderLinks";
import Container from "@app/ui/Container";
import HeaderPanel from "./HeaderPanel";

const Header = () => {
  return (
    <header className="py-3">
      <Container className="mx-auto flex flex-col md:flex-row md:h-[110px]">
        <HeaderLogo />
        <div className="flex flex-1 flex-col">
          <div className="flex-1 px-3 py-2 flex items-end">
            <span className="text-2xl font-semibold w-full cursor-default">
              React + Redux + Vite + TS
            </span>
          </div>
          <div className="flex flex-row flex-1 items-end place-content-end-safe">
            <HeaderSearch className="relative block px-3 py-2 flex-1" />
            <HeaderLinks className="flex-1 flex justify-around" />
          </div>
        </div>
        <HeaderPanel />
      </Container>
    </header>
  );
};

export default Header;
