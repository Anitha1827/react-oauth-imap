import "./App.css";
import { useEffect, useState } from "react";

const CLIENT_ID =
  "http://151351262140-3jrr3gsjvd4313tnhik6tb9fa8ml75kg.apps.googleusercontent.com";
const API_KEY = "AIzaSyAEd45b8sCu1MpKIlTQzhFrOIbn-geXG5A";
const SCOPES = ["https://www.googleapis.com/auth/userinfo.email"];

function App() {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const authenticate = async () => {
      try {
        // Load the Google API client library
        await window.gapi.load("client", async () => {
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
        });
      } catch (error) {
        console.error("Error authenticating with Google API:", error);
      }
    };

    // Load the Google API client library
    const loadGoogleClient = () => {
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/client.js";
      script.onload = authenticate; // Invoke authenticate() after the script is loaded
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
}

export default App;
