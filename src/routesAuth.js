import LoginForm from "./views/LoginForm";
import RegisterForm from "./views/RegisterForm";

const authRoutes = [
  {
    path: "/login",
    name: "로그인",
    component: LoginForm,
    layout: "/auth",
  },
  {
    path: "/join",
    name: "회원가입",
    component: RegisterForm,
    layout: "/auth",
  },
];

export default authRoutes;
