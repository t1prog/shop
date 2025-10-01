import { ThemeToggle } from "@components/features/ToggleTheme";
import { UserBtn } from "@components/features/UserBtn/";

const HeaderPanel = () => {
  return (
    <div className="flex flex-col flex-wrap justify-between w-[120px] items-end">
      <ThemeToggle className="border" />
      <div className="py-2">
        <span className="">
          <UserBtn className="border" />
        </span>
      </div>
    </div>
  );
};

export default HeaderPanel;
