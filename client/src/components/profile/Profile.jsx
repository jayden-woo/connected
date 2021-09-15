import React, { useEffect, useState } from "react";
import "./profile.css";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../Loading";

const Profile = () => {
  const { user, getAccessTokenSilently, isLoading } = useAuth0();
  const [userInfo, setUserInfo] = useState(null);

  // const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  if (isLoading) {
    return <Loading />;
  }

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

        const { username } = await response.json();
        setUserInfo(username);
      } catch (e) {
        console.log(e.message);
      }
    };
    getUserInfo();
  }, [getAccessTokenSilently, user?.sub]);

  return (
    <div className="row" style={{ margin: 0 }}>
      <div className="col-sm-4 bg-c-lite-green user-profile">
        <div className="card-block text-center text-white">
          <div className="m-b-20">
            <img
              src={user.picture}
              className="rounded-circle img-thumbnail img-fluid "
              alt="User-Profile"
              style={{ padding: 0, maxWidth: "90%" }}
            />
          </div>
          <p style={{ marginTop: 5 }}>{!userInfo && user.name}</p>
          <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16" />
        </div>
      </div>
      <div className="col-sm-8" style={{ paddingBottom: "50px", paddingRight: "100px" }}>
        <div className="card-block">
          <h4 className="m-b-10 p-b-5 b-b-default f-w-600">Information</h4>
          <div className="row">
            <div className="col-sm-8">
              <h5 className="f-w-600">Username</h5>
              <p className="text-muted f-w-400">
                {userInfo}
                {!userInfo && user.nickname}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-8">
              <h5 className="f-w-600">Email</h5>
              <p className="text-muted f-w-400">{user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
