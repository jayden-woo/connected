import React, { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../Loading";

const GetProfile = () => {
  const { user, isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      const domain = process.env.REACT_APP_AUTH0_DOMAIN;

      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:users read:user_idp_tokens read:current_user",
        });

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

        const response = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setUserInfo(await response.json());
      } catch (e) {
        console.log(e.message);
      }
    };

    getUserInfo();
  }, [getAccessTokenSilently, user?.sub]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    isAuthenticated && (
      <div style={{ margin: 200 }}>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        {userInfo ? <pre>{JSON.stringify(userInfo, null, 2)}</pre> : "Oops!"}
      </div>
    )
  );
};

export default withAuthenticationRequired(GetProfile, {
  onRedirecting: () => <Loading />,
});
