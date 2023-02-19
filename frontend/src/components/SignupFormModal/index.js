import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const user = useSelector(state => state.session.user);

  // useEffect(() => {
  //   const error = [];

  //   if (email.length === 0) error.push("Email can't be empty")
  //   if (username.length < 4) error.push("Username's length must be at least 4 characters")
  //   if (firstName.length === 0) error.push("FirstName can't be empty")
  //   if (lastName.length === 0) error.push("LastName can't be empty")
  //   if (password.length < 6) error.push("Password must have at least 6 characters")

  //   setErrors(error);
  // },[email, username, firstName, lastName, password])
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      const user = await dispatch(sessionActions.signup({ email, username, firstName, lastName, password }));
      if (!user.errors) {
        await dispatch(sessionActions.login({ credential: email, password }));
        closeModal();
      } else {
        setErrors(user.errors);
      }
    } else {
      setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };


  return (
    <>
      <div className="signUp-container">
        <div>
          <h1>Sign Up</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <div>
            <input
              placeholder="First Name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              placeholder="Last Name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={email === "" || username === "" || firstName === "" || lastName === "" || password === "" || username.length < 4 || password.length < 6 || password !== confirmPassword}>Sign Up</button>
        </form>
      </div>
    </>
  );
}

export default SignupFormModal;
