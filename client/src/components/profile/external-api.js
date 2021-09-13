/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

export const ExternalApi = () => {
  const [message, setMessage] = useState("");

  const { user, getAccessTokenSilently } = useAuth0();
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;

  const callSecureApi = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: `https://${domain}/api/v2/`,
        scope: "read:users read:user_idp_tokens read:current_user_metadata",
      });
      const response = await fetch(`https://${domain}/api/v2/users/${user.sub}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const responseData = await response.json();
      setMessage(responseData);
    } catch (e) {
      setMessage(e.message);
    }
  };

  return (
    <Container className="mb-5">
      <h1>External API</h1>
      <p>
        You use will use a button to call an external API using an access token, and the API will validate it using the
        API's audience value. <strong>This route should be private</strong>.
      </p>
      <Button onClick={callSecureApi} color="primary" className="mt-5">
        Get Private Message
      </Button>

      {message && (
        <div className="mt-5">
          <h6 className="muted">Result</h6>
          <p>{JSON.stringify(message, null, 2)}</p>
        </div>
      )}
    </Container>
  );
};

export default ExternalApi;
