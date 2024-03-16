import { isAuthenticated } from "./authService";

export default function guest({ next, router }) {
  const isAuth = isAuthenticated();
  console.log("User is authenticated:", isAuth);

  if (isAuth) {
    return router.push({ name: "home" });
  }
  return next();
}
