 
import { isAuthenticated } from "./authService";
export default function auth({ next, router }) {
  if (!isAuthenticated()) {
    window.location.href = "https://main-panel.dev.a.kubak.co/";
    return;
  }
  return next();
}
