import "./Register.css";

import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useRegisterMutation } from "../../authApiSlice";
import Loading from "../../../../components/Loading/Loading";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [fieldErrMsg, setFieldErrMsg] = useState([]);
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [fullName, username, email, password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        setErrMsg("Passwords do not match");
      } else {
        const userData = await register({
          fullName,
          username,
          email,
          password,
        });
        if (userData.error) {
          setErrMsg(userData.error.data.message);
          setFieldErrMsg(userData.error?.data?.data?.errors);
        } else {
          setFullName("");
          setUsername("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          navigate("/login");
        }
      }
    } catch (err) {
      if (!err?.status) {
        // isLoading: true until timeout occurs
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else if (err.status === 403) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Sign Up Failed");
      }
      errRef.current?.focus();
    }
  };

  const handleFullNameInput = (e) => setFullName(e.target.value);

  const handleUsernameInput = (e) => setUsername(e.target.value);

  const handleEmailInput = (e) => setEmail(e.target.value);

  const handlePasswordInput = (e) => setPassword(e.target.value);

  const handleConfirmPasswordInput = (e) => setConfirmPassword(e.target.value);

  const content = isLoading ? (
    <Loading />
  ) : (
    <section className="login">
      <div className="register-card">
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>

        <h1>Register</h1>

        <form
          onSubmit={handleSubmit}
          className="register-form"
          autoComplete="off"
        >
          <div className="form-control">
            <label htmlFor="fullname">Full Name:</label>
            <input
              type="text"
              id="fullname"
              ref={userRef}
              value={fullName}
              onChange={handleFullNameInput}
              required
            />
            <span className="validation-text">{fieldErrMsg?.fullName}</span>
          </div>

          <div className="form-control">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameInput}
              required
            />
            <span className="validation-text">{fieldErrMsg?.username}</span>
          </div>

          <div className="form-control">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailInput}
              required
            />
            <span className="validation-text">{fieldErrMsg?.email}</span>
          </div>

          <div className="form-control">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={handlePasswordInput}
              value={password}
              required
            />
            <span className="validation-text">{fieldErrMsg?.password}</span>
          </div>
          <div className="form-control">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              onChange={handleConfirmPasswordInput}
              value={confirmPassword}
              required
            />
          </div>

          <div className="form-control">
            <button>Sign Up</button>
          </div>
        </form>
      </div>
    </section>
  );

  return content;
};
export default Register;
