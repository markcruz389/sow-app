import { useEffect } from "react";
import { useNavigate } from "react-router";

export function useAuthRedirect({ redirectIfAuthenticated = false } = {}) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    // Check token for expiration, current set is 1d
    let isValid = false;
    if (token) {
      try {
        const [, payloadBase64] = token.split(".");
        const payloadJson = atob(payloadBase64);
        const payload = JSON.parse(payloadJson);

        const now = Math.floor(Date.now() / 1000);
        isValid = payload.exp ? payload.exp > now : true;
      } catch {
        isValid = false;
      }
    }

    if (!token || !isValid) {
      localStorage.removeItem("authToken");

      navigate("/login", { replace: true });
      return;
    }

    if (redirectIfAuthenticated) {
      navigate("/price-list", { replace: true });
    }
  }, [navigate, redirectIfAuthenticated]);
}
