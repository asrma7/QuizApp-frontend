import "./Login.css";

import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "../../authSlice";
import { useLoginMutation } from "../../authApiSlice";
import Loading from "../../../../components/Loading/Loading";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({ username, password });
      if (userData.data.accessToken) {
        const accessToken = userData.data.accessToken;
        const user = userData.data.user;
        dispatch(setCredentials({ accessToken, user }));
        setUsername("");
        setPassword("");
        navigate("/welcome");
      } else {
        setErrMsg(userData?.error?.data?.message);
      }
    } catch (err) {
      if (!err?.status) {
        // isLoading: true until timeout occurs
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current?.focus();
    }
  };

  const handleUsernameInput = (e) => setUsername(e.target.value);

  const handlePasswordInput = (e) => setPassword(e.target.value);

  const content = isLoading ? (
    <Loading />
  ) : (
    <section className="login">
      <div className="login-card">
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>

        <h1>Login</h1>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-control">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              value={username}
              onChange={handleUsernameInput}
              autoComplete="off"
              required
            />
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
          </div>
          <div className="form-control">
            <button>Sign In</button>
          </div>
        </form>
      </div>
    </section>
  );

  return content;
};
export default Login;
