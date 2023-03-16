import banklyLogo from "./assets/bankly.svg";
import "./app.css";
import { Home } from "./views/home";

const App = () => (
  <div className="app">
    <div className="app__row">
      <a href="https://www.thisisbud.com/" target="_blank" rel="noreferrer">
        <img src={banklyLogo} className="logo" alt="Banky logo" />
      </a>
    </div>
    <Home />
  </div>
);

export default App;
