import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./landingPage/NavBar/NavBar";

function App() {
  return (
    <div>
      <NavBar />

      <Outlet />
    </div>
  );
}

export default App;
