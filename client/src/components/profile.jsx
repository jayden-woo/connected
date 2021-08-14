import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import http from "../services/httpService";

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const testAuth = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `localhost:3000/api/`,
          scope: "read:posts",
        });

        http.setJwt(accessToken);

        const { data } = await http.get("http://localhost:3000/api/private");
        console.log(data);
      } catch (e) {
        console.log("Cannot login");
      }
    };

    testAuth();
  }, [getAccessTokenSilently]);

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;
