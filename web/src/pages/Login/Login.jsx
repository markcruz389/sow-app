import "./Login.css";
import showPasswordIcon from "../../assets/show_password.png";
import hidePasswordIcon from "../../assets/hide_password.png";
import { useState } from "react";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
  return password && password.length >= 4;
}

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
  }

  function handleSubmit(e) {
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
  }

  function toggleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  const passwordInputType = showPassword ? "text" : "password";
  const passwordToggleIcon = showPassword ? hidePasswordIcon : showPasswordIcon;

  return (
    <div>
      <h1>Header</h1>
      <div id="login-card-container">
        <div id="login-card">
          <h2>Log in</h2>
          <form onSubmit={handleSubmit}>
            <div id="email-container">
              <p className="input-label">Enter your email address</p>
              <input
                type="text"
                placeholder="Email address"
                name="email"
                value={formData.email}
                onChange={(e) => handleChange(e)}
              />
              {formError.email && (
                <p className="input-error">{formError.email}</p>
              )}
            </div>
            <div>
              <p className="input-label">Enter your password</p>
              <div id="password-container">
                <input
                  type={passwordInputType}
                  placeholder="Password"
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
              <button type="submit">Log In</button>
            </div>
          </form>

          <div id="login-card-footer">
            <a href="/signup">Register</a>
            <a href="/forgot-password">Forgotten password?</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
