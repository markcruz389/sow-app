import { useAuthRedirect } from "../hooks/useAuthRedirect";

export default function ProtectedRoute({ children }) {
  useAuthRedirect();
  return children;
}
