/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Image, Nav, Modal, Spinner } from "react-bootstrap";
import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";
import PasswordResetButton from "./Reset";
import notify from "../../helpers/notifyService";
import EditButton from "./editButton";
import axios from "../../helpers/axios";
import "../../css/profile.css";

const Profile = ({ sub }) => {
  const [modalEditPaShow, setModalEditPaShow] = useState(false);
  const [modalEditUsShow, setModalEditUsShow] = useState(false);
  const [state, setState] = useState({
    data: null,
    loading: true,
    dbconnect: false,
  });
  const { user, isLoading } = useAuth0();

  const handleEditClose = () => {
    setModalEditPaShow(false);
    setModalEditUsShow(false);
  };
  const handleEditPaShow = () => setModalEditPaShow(true);
  const handleEditUsShow = () => setModalEditUsShow(true);

  useEffect(() => {
    (async () => {
      const getUser = async () => {
        try {
          const res = await axios.get(`/api/auth0/getuserinfo/${sub}`);
          setState({
            data: res.data,
            loading: false,
            dbconnect: res.data.identities[0].connection === "Username-Password-Authentication" && user.sub === sub,
          });
        } catch (error) {
          setState({
            ...state,
            loading: false,
          });
          notify.errorNotify(error.response.data.message);
        }
      };
      getUser();
    })();
  }, [user?.sub, modalEditPaShow, modalEditUsShow]);

  if (state.loading || isLoading) {
    return <Spinner animation="grow" />;
  }

  const { picture, username, name, nickname, email } = state.data;

  return (
    <Card className="user-card-full" style={{ margin: 0 }}>
      <Container fluid>
        <Row xs={2} sm={2}>
          <Col xs={4} sm={4} className="bg-c-lite-green user-profile">
            <div className="m-b-20 text-center">
              <Image src={picture} className="img-thumbnail" alt="User-Profile-Pic" roundedCircle />
            </div>
            <div className="text-center text-white">
              <p style={{ marginTop: 5 }} className="profile-content">
                {!username && name}
              </p>
              <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16" />
            </div>
          </Col>
          <Col xs={8} sm={8}>
            <div className="card-block">
              <Row style={{ paddingBottom: "7px" }}>
                <Modal.Header
                  style={{ paddingTop: 0, paddingBottom: "7px", paddingLeft: "10.5px", paddingRight: "10.5px" }}
                  closeButton
                >
                  <h4 className="profile-title" style={{ margin: 0 }}>
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
                    {state.dbconnect && (
                      <Col>
                        <Nav.Link onClick={handleEditUsShow} style={{ paddingTop: 0, color: "rgba(0,0,0,.55)" }}>
                          Edit
                        </Nav.Link>
                        <EditButton show={modalEditUsShow} onHide={handleEditClose} sub={sub} updateFiled="username" />
                      </Col>
                    )}
                  </Row>
                  <Row>
                    <p className="text-muted profile-content">
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
                    {state.dbconnect && (
                      <Col>
                        <Nav.Link onClick={handleEditPaShow} style={{ paddingTop: 0, color: "rgba(0,0,0,.55)" }}>
                          Edit
                        </Nav.Link>
                        <EditButton show={modalEditPaShow} onHide={handleEditClose} sub={sub} updateFiled="email" />
                      </Col>
                    )}
                  </Row>
                  <Row>
                    <p className="text-muted profile-content">{email}</p>
                  </Row>
                </Col>
              </Row>
              {state.dbconnect && (
                <Row>
                  <Col>
                    <Row>
                      <Col>
                        <PasswordResetButton className="profile-content" email={email} />
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
