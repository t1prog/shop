import { useAppDispatch, useAppSelector } from "@app/hooks/redux";
import { useCallback } from "react";
import { logout } from "@app/store/authSlice";

export const useAuth = () => useAppSelector((state) => state.auth);

export const useAuthActions = () => {
  const dispatch = useAppDispatch();
  return {
    logout: useCallback(() => {
      dispatch(logout());
    }, [dispatch]),
  };
};
