import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Board from './components/Board';
import { DarkModeProvider } from './components/DarkModeContext';

function App() {
  return (
    <>
    <DarkModeProvider>
     <Header />
       <main className='content'>
        <Board />
      </main>
      <Footer />
    </DarkModeProvider>
    </>
  );
}

export default App
