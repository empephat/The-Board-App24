import './App.css';
import { useState } from 'react';
import Header from './components/Header';
import Board from './components/Board';
import Modal from './components/Modal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <Header />
    <main className='content'>
        <Board />
        <div>
      <button onClick={handleOpenModal}>Open Modal</button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <p>This is a modal popup window.</p>
      </Modal>
    </div>
    </main>
    </>
  );
}

export default App
