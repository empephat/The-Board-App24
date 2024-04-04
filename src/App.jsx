import './App.css';
import Header from './components/Header';
import Board from './components/Board';

function App() {
  return (
    <>
    <Header />
    <main className='content'>
        <Board />
    </main>
    </>
  );
}

export default App
