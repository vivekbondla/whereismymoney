import React, { useContext } from "react";
import { useNavigate,Link } from "react-router-dom";
import { useState } from "react";
import Card from "../../UI/Card";
import "./InputForm.css";
import AuthContext from "../../store/auth-context";
import LoadingSpinner from "../../UI/LoadingSpinner";

console.log(process.env.REACT_APP_BACKEND_URL)

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");

  const[isLoading,setIsLoading] = useState(false)

  const authCtx = useContext(AuthContext)

  const navigate = useNavigate(); //used to navigate to some page programmatically

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  const numberHandler = (event) => {
    setNumber(event.target.value);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true)

    try {
      const fetchResult = await fetch(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          number: number,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await fetchResult.json();
      setIsLoading(false)

      // console.log(res.user.id);
      authCtx.login(responseData.user.id)
    } catch (e) {
      setIsLoading(false)
      // console.error(e);
      alert(e)
    }
    
    navigate("/home"); //to navigate(Imperative navigation) to home page when we click on submit button
  };

  return (
    <>
    {isLoading&&<LoadingSpinner asOverlay/>}
    <Card className="signup">
      <p>New user sign up here!</p>
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
            placeholder="password"
            onChange={passwordHandler}
          />
        </div>

        <div>
          <input
            placeholder="number"
            type="tel"
            id="number"
            onChange={numberHandler}
          />
        </div>
        <div>
          <button type="submit">Sign Up</button>
          <p>Already have an account?</p>
          <Link to='/'>Click here to login</Link>
        </div>
      </form>
     
    </Card></>
  );
};
export default SignUpPage;
