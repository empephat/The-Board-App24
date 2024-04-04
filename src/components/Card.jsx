import { Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';
import { MdEdit } from "react-icons/md";
import { IoRemoveCircle } from "react-icons/io5";
import Modal from './Modal';

const Card = ({ task, index, title, handleDeleteTask }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const removeTask = () => {
    handleDeleteTask(task.id);
    handleCloseModal(); 
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provided, snapshot) => (
        <div
          className={`taskContainer ${isModalOpen ? 'modalOpen' : ''}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          style={{
            backgroundColor: snapshot.isDragging ? 'lightblue' : 'white',
            ...provided.draggableProps.style,
          }}
        >
          <div>
            <p className='idNumber'>#{task.id} {"   "}</p>
          </div>
          <div>
            {task.title}
          </div>
          <div>
            <p className='dateTime'>{formattedDate}</p>
            <button className='editButton' onClick={handleOpenModal}><MdEdit /></button>
          <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <p style={{backgroundColor: '#359BFC', color: 'white', borderRadius: '10px'}}>{title}</p>
            <p style={{fontSize: '2rem'}}>{task.title}</p>
            <p className='dateTime' style={{textAlign: 'center'}}>{formattedDate} </p>
            <br />
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates, quae cupiditate dignissimos ex omnis ipsum nisi corporis nam ipsa laboriosam illum consectetur earum fuga quasi rem. Modi esse quos nesciunt.</p>
            <button onClick={removeTask} className='deleteButton' style={{backgroundColor: 'red', color: 'white', fontWeight: '500', padding: '5px 12px', borderRadius: '10%', marginTop: '4rem'}}>
              <IoRemoveCircle className='icons' style={{marginRight: '3px', marginTop: '-3px'}}/>
              Remove Task
              </button>
          </Modal>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default Card;
