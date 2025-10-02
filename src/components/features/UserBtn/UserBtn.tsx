import UserIcon from "@assets/svg/user.min.svg?react";
import { Link } from "react-router";
import styles from "./UserBtn.module.scss";
import clsx from "clsx";

export interface UserBtnProps {
  className?: string;
}

export const UserBtn = ({ className }: UserBtnProps) => {
  return (
    <Link to="/profile" className={clsx(className, styles.UserBtn)}>
      <UserIcon className={styles.Img} />
    </Link>
  );
};
