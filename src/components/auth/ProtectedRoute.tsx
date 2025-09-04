import { useAuth } from "@/hooks/useAuth";

import { setUserProfile } from "@/store/authSlice";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useAuth();

  console.log(isAuthenticated);
  useEffect(() => {
    if (user) {
      //neu user ton tai thi goi dispatch luu vao trong store
      dispatch(
        setUserProfile(
          user // nếu có dataUser thì lưu vào trong store setUserProfile
        )
      );
    }
  }, [user]);

  //   console.log(data, "datata");

  if (!isAuthenticated) return <Navigate to={"/auth/login"} />;
  return <Outlet />;
}
