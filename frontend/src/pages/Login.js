import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";

// Author: teasec4
// Date: Sep 26, 2022
// Title of source code: react doesn't update the data, only after reloading page
// Type: source code
// Web address: https://stackoverflow.com/questions/73853036/react-doesnt-update-the-data-only-after-reloading-page

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log in</h3>

      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button disabled={isLoading}>Log in</button>
      <p>
        Not a member?
        <Link
          to="/signup"
          style={{ textDecoration: "none", fontWeight: "600" }}
        >
          {" "}
          Create an account
        </Link>
      </p>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
