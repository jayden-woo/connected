import "./App.css";
import LoginButton from "./components/loginButton";
import LogoutButton from "./components/logoutButton";
import Profile from "./components/profile";

function App() {
  return (
    <div>
      <Profile />
      <LoginButton />
      <LogoutButton />
    </div>
  );
}

export default App;
