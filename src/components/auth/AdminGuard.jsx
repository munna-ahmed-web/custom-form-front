import { useSelector } from "react-redux"; // or your state management solution
import ForAdmin from "../../pages/not-permitted/ForAdmin";

export const AdminGuard = ({ children }) => {
  const user = useSelector((state) => state.userInfo);
  return user.isAdmin ? children : <ForAdmin />;
};
