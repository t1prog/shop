import UserIcon from "@assets/svg/user.min.svg?react";
import styles from "./UserBtn.module.scss";
import clsx from "clsx";

export interface UserBtnProps {
  className?: string;
}

export const UserBtn = ({ className }: UserBtnProps) => {
  return (
    <a href="/profile" className={clsx(className, styles.UserBtn)}>
      <UserIcon className={styles.Img} />
    </a>
  );
};
