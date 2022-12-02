import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Card from "../../UI/Card";
import "./InputForm.css";
import AuthContext from "../../store/auth-context";
import LoadingSpinner from "../../UI/LoadingSpinner";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const navigate = useNavigate(); //used to navigate to some page programmatically

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const fetchResult = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await fetchResult.json();
      setIsLoading(false);

      if (!fetchResult.ok) {
        //  console.log(responseData);
        alert(responseData.message);
      }
      //  console.log(responseData.user.id)

      authCtx.login(responseData.user.id);
      console.log(authCtx.isLoggedIn);
      navigate("/home");
    } catch (e) {
      setIsLoading(false);
      // console.log(e.message)
      // alert(e.message);
    }
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <Card className="signup">
        {isLoading && <LoadingSpinner asOverlay />}
        <p>Login with your credentials !</p>
        <form onSubmit={formSubmitHandler}>
          <div>
            <input
              type="email"
              id="email"
              placeholder="Email"
              onChange={emailHandler}
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              placeholder="Password"
              onChange={passwordHandler}
            />
          </div>
          <div>
            <button type="submit">Dive into app</button>
            <p>
              New user ? sign up <Link to="/signup">here</Link>
            </p>
          </div>
        </form>
      </Card>
    </>
  );
};
export default LoginPage;
