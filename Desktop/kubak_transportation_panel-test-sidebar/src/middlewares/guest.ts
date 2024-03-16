import { isAuthenticated } from "./authService";
export default function guest({ next, router }) {
  if (isAuthenticated()) {
    return router.push({ name: "home" });
  }
  return next();
}
