import "./Login.css";
import showPasswordIcon from "../../assets/show_password.png";
import hidePasswordIcon from "../../assets/hide_password.png";
import { useState } from "react";
import LoginHeader from "./LoginHeader";
import { useNavigate } from "react-router";
import { useAuthRedirect } from "../../hooks/useAuthRedirect.jsx";
import { useTranslation } from "../../providers/TranslationProvider.jsx";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
  return password && password.length >= 4;
}

function Login() {
  const navigate = useNavigate();
  const { translations } = useTranslation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  useAuthRedirect({ redirectIfAuthenticated: true });

  async function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { email, password } = formData;

    setFormError({
      email: "",
      password: "",
    });

    if (!isValidEmail(email)) {
      setFormError((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
      return;
    }

    if (!isValidPassword(password)) {
      setFormError((prev) => ({
        ...prev,
        password: "The field must be at least 4 characters long",
      }));
      return;
    }

    const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.status === 401 || res.status === 400) {
      setFormError((prev) => ({
        ...prev,
        password: "Invalid email or password",
      }));
      return;
    }

    if (res.status === 500) {
      setFormError((prev) => ({
        ...prev,
        password: "Server error. Please try again later.",
      }));
      return;
    }

    if (!res.ok) {
      setFormError((prev) => ({
        ...prev,
        password: "An unexpected error occurred. Please try again.",
      }));
      return;
    }

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("authToken", data.token);
      navigate("/price-list");
      return;
    }
  }

  function toggleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  const passwordInputType = showPassword ? "text" : "password";
  const passwordToggleIcon = showPassword ? hidePasswordIcon : showPasswordIcon;

  return (
    <div id="login-page-container">
      <LoginHeader />

      <section id="login-card-container">
        <div id="login-card">
          <h2>{translations["login.log-in"]}</h2>
          <form onSubmit={handleSubmit}>
            <div id="email-container">
              <p className="input-label">
                {translations["login.enter-your-email-address"]}
              </p>
              <input
                type="text"
                placeholder={translations["login.email-address"]}
                name="email"
                value={formData.email}
                onChange={(e) => handleChange(e)}
              />
              {formError.email && (
                <p className="input-error">{formError.email}</p>
              )}
            </div>
            <div>
              <p className="input-label">
                {translations["login.enter-your-password"]}
              </p>
              <div id="password-container">
                <input
                  type={passwordInputType}
                  placeholder={translations["login.password"]}
                  name="password"
                  value={formData.password}
                  onChange={(e) => handleChange(e)}
                />
                <div id="password-toggle" onClick={toggleShowPassword}>
                  <img src={passwordToggleIcon} alt="Show password" />
                </div>
                {formError.password && (
                  <p className="input-error">{formError.password}</p>
                )}
              </div>
            </div>

            <div id="login-btn-container">
              <button type="submit">{translations["login.log-in"]}</button>
            </div>
          </form>

          <div id="login-card-footer">
            <a href="/signup">{translations["login.register"]}</a>
            <a href="/forgot-password">
              {translations["login.forgotten-password"]}
            </a>
          </div>
        </div>
      </section>

      <footer id="login-footer">
        <div id="login-footer-links">
          <h2>123 Fakturera</h2>

          <div id="login-footer-right">
            <a href="#">{translations["nav.home"]}</a>
            <a href="#">{translations["nav.order"]}</a>
            <a href="#">{translations["nav.our-customers"]}</a>
          </div>
        </div>
        <p id="login-footer-copy">
          &copy; 2024 Your Company. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Login;
