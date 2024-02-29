import React, { useEffect, useState } from "react";

const OAuthWithImap = () => {
  const [email, setEmail] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const clientId =
    "549737573935-1f22i9asdloi22l698cvsguolbk8uu11.apps.googleusercontent.com";
  const redirectUri = "http://localhost:3000/auth/google/callback";

  useEffect(() => {
    // Check if the page has been redirected from the OAuth flow
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("access_token");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  //  Function to handle OAuth authentication
  const handleOAuthSignIn = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/auth?response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}&scope=https://www.googleapis.com/auth/gmail.readonly&access_type=offline`;
  };

  //Function to fetch emails
  const fetchEmails = async () => {
    try {
      //get request to the email API's messages endpoints
      const response = await fetch(
        "https://www.googleapis.com/gmail/v1/users/me/messages",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, //doubt
          },
        }
      );

      if (response.ok) {
        //parse the response from body as a json
        const data = await response.json();
        //extract message from the response data
        const message = data.message;
        console.log("Emails", message);
      } else {
        //message not succesfull
        console.error("Faild to fetch emails:", response.statusText);
      }
    } catch (error) {
      // if an error accured during the reqest
      console.error("Error fetching emails:", error.message);
    }
  };
  return (
    <div>
      <h1>Gmail accessing</h1>
      {email && <p>Email: {email}</p>}
      <button onClick={handleOAuthSignIn}> sign in with google</button>
      <button onClick={fetchEmails}>fetch email</button>
    </div>
  );
};

export default OAuthWithImap;
