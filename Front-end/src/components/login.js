import React, {useEffect, useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

function Login({setIsLoggedIn, setUserToken, setUserProfile}) {
  const google = window.google;
  const navigate = useNavigate();

  const handleCallbackResponse = useCallback(
    (response) => {
      let userObject = jwtDecode(response.credential);

      setIsLoggedIn(true);
      setUserToken(response.credential);
      setUserProfile(userObject);

      console.log(userObject);

      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      localStorage.setItem("userToken", response.credential);
      localStorage.setItem("userProfile", JSON.stringify(userObject)); // Convert to JSON string

      navigate("/");
    },
    [navigate, setIsLoggedIn, setUserToken, setUserProfile]
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
