import { useContext, useMemo } from 'react';
import ColorChangeContext from "./ColorChangeContext";

const Header = ( handleAddTask ) => {
  const { isColorChange } = useContext(ColorChangeContext);

  const headerStyle = useMemo(() => ({
    backgroundColor: isColorChange ? 'var(--orange-bg-color)' : 'var(--blue-bg-color)',
  }), [isColorChange]);

  return (
    <header className="header" style={headerStyle}>
      <h1>MY BOARD APP</h1>
    </header>
  );
};

export default Header;
