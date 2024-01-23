import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import { Link } from "react-router-dom";

// Author: teasec4
// Date: Sep 26, 2022
// Title of source code: react doesn't update the data, only after reloading page
// Type: source code
// Web address: https://stackoverflow.com/questions/73853036/react-doesnt-update-the-data-only-after-reloading-page

const Signup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(username, email, password)
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      
      <label>Username:</label>
      <input 
        type="text" 
        onChange={(e) => setUsername(e.target.value)} 
        value={username} 
      />

      <label>Email address:</label>
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

      <button disabled={isLoading}>Sign up</button>
      <p>
        Joined us before?
        <Link
          to="/login"
          style={{ textDecoration: "none", fontWeight: "600" }}
        >
          {" "}
          Log in now
        </Link>
      </p>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup