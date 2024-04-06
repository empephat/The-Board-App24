import { useContext, useMemo } from 'react';
import { IoColorPaletteOutline, IoColorPalette } from "react-icons/io5";
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
