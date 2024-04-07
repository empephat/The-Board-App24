//Styles
import './App.css';
//Components
import Header from './components/Header';
import Footer from './components/Footer';
import Board from './components/Board';
//Context
import { ColorChangeProvider } from './components/ColorChangeContext';

function App() {
  return (
    <>
    <ColorChangeProvider>
     <Header />
        <Board />
      <Footer />
    </ColorChangeProvider>
    </>
  );
}
export default App
