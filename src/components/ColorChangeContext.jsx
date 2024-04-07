// React
import { createContext, useState } from "react";

const ColorChangeContext = createContext();

export const ColorChangeProvider = ({ children }) => {
    const [isColorChange, setIsColorChange] = useState(false);
  
    const toggleColorChange = () => {
        setIsColorChange(prevMode => !prevMode);
    };

    return (
        <ColorChangeContext.Provider value={{ isColorChange, toggleColorChange }}>
            {children}
        </ColorChangeContext.Provider>
    );
};

export default ColorChangeContext;
