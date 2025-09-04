import type { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useGetProfileQuery, useLogoutMutation } from "@/store/api/baseApi";
import { logout } from "@/store/authSlice";
import { toast } from "sonner";
export function useAuth() {
  const dispatch = useDispatch();
  const { isAuthenticated, accessToken } = useSelector(
    (state: RootState) => state.auth
  );
  const { data: user } = useGetProfileQuery(undefined, { skip: !accessToken }); //chua can queryParams nen de undefine
  //skip: bo qua api nay nếu accessToken không có

  const [logoutApi] = useLogoutMutation();
  const handleLogout = async () => {
    try {
      const result = await logoutApi();
      toast.success(result.data?.message);
    } catch (error) {
      toast.error("Đăng xuất thất bại");
    } finally {
      dispatch(logout());
    }
  };
  return { isAuthenticated, user, logout: handleLogout };
}
