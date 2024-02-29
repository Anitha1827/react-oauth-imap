import React, { useState, useEffect } from "react";
import { google } from "googleapis";

const CLIENT_ID =
  "549737573935-1f22i9asdloi22l698cvsguolbk8uu11.apps.googleusercontent.com";
const API_KEY = "AIzaSyCBd1N1BGnWEti0kxM7dtgjo3oxvAyMmOY";
const SCOPES = ["https://www.googleapis.com/auth/userinfo.email"];

const MyComponent = () => {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const authenticate = async () => {
      try {
        // Load the Google API client library
        await window.gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          scope: SCOPES.join(" "),
        });

        // Sign in the user
        await window.gapi.auth2.getAuthInstance().signIn();

        // Get user profile information
        const response = await window.gapi.client.request({
          path: "https://www.googleapis.com/oauth2/v1/userinfo",
        });

        // Extract and set email address
        setEmail(response.result.email);
      } catch (error) {
        console.error("Error authenticating with Google API:", error);
      }
    };

    // Load the Google API client library
    const loadGoogleClient = () => {
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/client.js";
      script.onload = authenticate;
      document.body.appendChild(script);
    };

    loadGoogleClient();
  }, []);

  return (
    <div>
      <h1>Email Address:</h1>
      {email ? <p>{email}</p> : <p>Loading...</p>}
    </div>
  );
};

export default MyComponent;
