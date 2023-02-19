import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };

  const demoUser = () => {
    return dispatch(sessionActions.login({credential: 'Demo-lition', password: 'password'}))
    .then(closeModal)
  }

  return (
    <>
      <div className="login-container">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit} className='login-form'>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div className="input-div">
              <input
              placeholder="Username or Email"
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
          </div >
          <div className="input-div">
              <input
              placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
          </div>
          <button type="submit" className="login-button" disabled={password.length < 6 || credential.length < 4}>Log In</button>
        </form>
        <button className="demo-user" onClick={demoUser}>Log in as Demo User</button>
      </div>
    </>
  );
}

export default LoginFormModal;
