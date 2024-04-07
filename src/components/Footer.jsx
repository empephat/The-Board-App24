// React
import { useContext, useMemo } from 'react';
// Icons
import { IoColorPaletteOutline, IoColorPalette } from "react-icons/io5";
// Context
import ColorChangeContext from "./ColorChangeContext";

const Footer = () => {
    const { isColorChange, toggleColorChange } = useContext(ColorChangeContext);

    const footerStyle = useMemo(() => ({
        backgroundColor: isColorChange ? 'var(--orange-bg-color)' : 'var(--blue-bg-color)',
      }), [isColorChange]);

    return (
        <footer style={footerStyle}>
            <div onClick={toggleColorChange}>
            {isColorChange ? <IoColorPaletteOutline /> : <IoColorPalette />}
            </div>
        </footer>
    );
};

export default Footer;
