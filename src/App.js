import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import LoginPage from "./components/Authentication/LoginPage";
import SignUpPage from "./components/Authentication/SignUpPage";
import ExpenseForm from "./components/ExpenseForm";
import ListOfExpenses from "./components/ListOfExpenses";
import AuthContext from "./store/auth-context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  const loginHandler = (uid) => {
    setUserId(uid);
    setIsLoggedIn(true);
    localStorage.setItem("userData", JSON.stringify({ userId: uid }));
  };

  const logoutHandler = () => {
    setUserId(null);
    setIsLoggedIn(false);
    localStorage.removeItem("userData");
    navigate("/");
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));

    if (storedData) {
      loginHandler(storedData.userId);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      <Routes>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/" element={<LoginPage />}></Route>
        {isLoggedIn && (
          <Route path="/home" element={<ExpenseForm userId={userId} />}></Route>
        )}
        {isLoggedIn && (
          <Route
            path="/expense/:userId"
            element={<ListOfExpenses userId={userId} />}
          ></Route>
        )}
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
