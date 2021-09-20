import React, { useEffect, useState } from "react";
import "./profile.css";
import { Card, Container, Row, Col, Image, Modal, Spinner } from "react-bootstrap";
import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";
import PasswordResetButton from "./Reset";
// import EditButton from "./editButton";

const Profile = ({ sub }) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const [state, setState] = useState({
    error: null,
    data: null,
    loading: true,
  });
  const { user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    (async () => {
      const getUser = async () => {
        try {
          const accessToken = await getAccessTokenSilently({
            audience: `https://${domain}/api/v2/`,
            scope: "read:users read:user_idp_tokens",
          });

          const userDetailsByIdUrl = `https://${domain}/api/v2/users/${sub}`;

          const apiResponse = await fetch(userDetailsByIdUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setState({
            data: await apiResponse.json(),
            loading: false,
          });
        } catch (error) {
          setState({
            ...state,
            error,
            loading: false,
          });
        }
      };
      getUser();
    })();
  }, [getAccessTokenSilently, user?.sub]);

  if (state.loading) {
    return <Spinner animation="grow" />;
  }

  const { picture, username, name, nickname, email, identities } = state.data;
  const passwordReset = identities[0].connection === "Username-Password-Authentication";

  return (
    <Card className="user-card-full" style={{ height: "100%", margin: 0 }}>
      <Container fluid>
        <Row>
          <Col sm={4} className="bg-c-lite-green user-profile">
            <div className="m-b-20 text-center">
              <Image src={picture} className="img-thumbnail" alt="User-Profile-Pic" roundedCircle />
            </div>
            <div className="text-center text-white">
              <p style={{ marginTop: 5 }}>{!username && name}</p>
              <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16" />
            </div>
          </Col>
          <Col sm={8}>
            <div className="card-block">
              <Row style={{ paddingBottom: "7px" }}>
                <Modal.Header
                  style={{ paddingTop: 0, paddingBottom: "7px", paddingLeft: "10.5px", paddingRight: "10.5px" }}
                  closeButton
                >
                  <h4 className="f-w-600" style={{ margin: 0 }}>
                    Information
                  </h4>
                </Modal.Header>
              </Row>
              <Row>
                <Col>
                  <Row>
                    <Col>
                      <h5 className="f-w-600">Username</h5>
                    </Col>
                    {/* <Col>
                      <EditButton updateFiled="Username" />
                    </Col> */}
                  </Row>
                  <Row>
                    <p className="text-muted f-w-400">
                      {username}
                      {!username && nickname}
                    </p>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Row>
                    <Col>
                      <h5 className="f-w-600">Email</h5>
                    </Col>
                    {/* <Col>
                      <EditButton updateFiled="Email" />
                    </Col> */}
                  </Row>
                  <Row>
                    <p className="text-muted f-w-400">{email}</p>
                  </Row>
                </Col>
              </Row>
              {passwordReset && (
                <Row>
                  <Col>
                    <Row>
                      <Col>
                        <PasswordResetButton className="f-w-400" email={email} />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default Profile;

Profile.propTypes = {
  sub: PropTypes.string.isRequired,
};
