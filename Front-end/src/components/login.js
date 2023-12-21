import React, {useEffect, useCallback} from "react";
import {useNavigate} from "react-router-dom";

function Login({setIsLoggedIn, setUserToken}) {
  const google = window.google;
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleCallbackResponse = useCallback(
    (response) => {
      setIsLoggedIn(true);
      setUserToken(response.credential);

      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      localStorage.setItem("userToken", response.credential);

      navigate("/");
    },
    [navigate, setIsLoggedIn, setUserToken]
  );

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "549978783695-9a75ht1gsncng95gf8uq8o8jtcp010at.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("sign-in-div"), {
      theme: "outline",
      size: "large",
    });
  }, [google.accounts.id, handleCallbackResponse, setIsLoggedIn]);

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="p-4 max-w-md mx-auto bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Login with Google</h2>
          <div className="flex items-center justify-center">
            <div id="sign-in-div"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
