import { useAppDispatch, useAppSelector } from "@app/hooks/redux";
import { useEffect, useCallback } from "react";
import { authService } from "@app/services/authService";
import { fetchUserProfile, clearCredentials } from "@app/store/authSlice";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    const token = authService.getToken();
    if (token && !auth.user) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, auth.user]);

  const logout = useCallback(() => {
    dispatch(clearCredentials());
  }, [dispatch]);

  return { ...auth, logout };
};
