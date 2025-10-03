import { useAppDispatch, useAppSelector } from "@app/hooks/redux";
import { useCallback } from "react";
import { clearCredentials } from "@app/store/authSlice";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  const logout = useCallback(() => {
    dispatch(clearCredentials());
  }, [dispatch]);

  return { ...auth, logout };
};
