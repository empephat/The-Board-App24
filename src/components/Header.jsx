import { useContext } from 'react';
import { FaHome } from "react-icons/fa";
import DarkModeContext from "./DarkModeContext";

const Header = () => {

  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <header className="header" style={{ backgroundColor: isDarkMode ? '#fc8135' : '#359BFC' }}>
      <h1>THE BOARD APP</h1>
        <div className="icon-container">
          <FaHome />
        </div>
    </header>
  );
};

export default Header;
