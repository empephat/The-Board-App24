import { useContext } from 'react';
import { MdOutlineDarkMode, MdDarkMode } from "react-icons/md";
import DarkModeContext from "./DarkModeContext";

const Footer = () => {
    const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

    return (
        <footer style={{ backgroundColor: isDarkMode ? '#fc8135' : '#359BFC' }}>
            <div onClick={toggleDarkMode}>
            {isDarkMode ? <MdDarkMode /> : <MdOutlineDarkMode />}
            </div>
        </footer>
    );
};

export default Footer;
