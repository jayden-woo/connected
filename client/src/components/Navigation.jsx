import { Navbar, Nav, NavDropdown, Container, Image } from 'react-bootstrap';
import logo from '../assets/connected.svg';
import { useAuth0 } from "@auth0/auth0-react";

const Navigation = () => {
    const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();
    
    return (
      <Navbar fixed="top" expand="lg" bg="light">
        <Container>
          <Navbar.Brand style={{fontWeight:'bold', color:'#000766'}} href="#home">
            <Image
              src={logo}
              width="50"
              height="50"
              // className="d-inline-block align-top"
              alt="TEAM CONNECTED logo"
            />{' '}
          CONNECTED               
          </Navbar.Brand>&emsp;&emsp;&emsp;&emsp;
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse fill className="justify-content-center">
            <Nav fill>
              <Nav.Link href="#home">&emsp;&emsp;HOME&emsp;&emsp;</Nav.Link>
              <Nav.Link href="#link">&emsp;&emsp;SURVEY&emsp;&emsp;</Nav.Link>
              <Nav.Link href="#link">&emsp;&emsp;ABOUT&emsp;&emsp;</Nav.Link>
            </Nav>
          </Navbar.Collapse>

          <Navbar.Collapse fill className="justify-content-end">
            {!isAuthenticated && (
              <Nav>
                <Nav.Link 
                  style={{fontWeight:'bold', color:'#000766'}} 
                  onClick={() => loginWithRedirect()}
                >
                  LOG IN
                </Nav.Link>
              </Nav>
            )}
            {isAuthenticated && (
              <>
                <Nav fill>
                    <Nav.Item>
                      <Image 
                        src={user.picture} 
                        width="50" 
                        height="50" 
                        alt="ProfilePic"
                        roundedCircle
                      />
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link>{user.name}</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link 
                        style={{fontWeight:'bold', color:'#000766'}} 
                        onClick={() => logout({ returnTo: window.location.origin })}
                      >
                        LOG OUT
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default Navigation;