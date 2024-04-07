// React
import { useState, useContext, useMemo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
// Icons
import { MdEdit, MdDelete } from "react-icons/md";
import { IoRemoveCircle } from "react-icons/io5";
import { IoMdAddCircle } from "react-icons/io";
//Components
import Modal from './Modal';
//Context
import ColorChangeContext from "./ColorChangeContext";

const Card = ({ task, index, title, handleSaveChanges, handleDeleteTask }) => {
  const { isColorChange } = useContext(ColorChangeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const today = new Date();
  const formattedDate = today.toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  const cardStyle = useMemo(() => ({
    backgroundColor: isColorChange ? 'var(--orange-bg-color)' : 'var(--blue-bg-color)',
  }), [isColorChange]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const saveTask = () => {
    const updatedTask = { ...task, title: editedTitle };
    handleSaveChanges(task.id, updatedTask, editedTitle);
    handleCloseModal();
  };

  const handleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const removeTask = () => {
    handleDeleteTask(task.id);
    handleCloseModal(); 
  };

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
            {task.title}
          </div>
          <div>
          <p className='dateTime'>{formattedDate}</p>
              <button className={`editIcon ${snapshot.isDragging ? 'dragging' : ''}`} onClick={handleOpenModal}><MdEdit /></button>
              <button className={`deleteIcon ${snapshot.isDragging ? 'dragging' : ''}`} onClick={removeTask}><MdDelete /></button>
          <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <p style={{ ...cardStyle, ...{ color: 'white', borderRadius: '10px' } }}>{title}</p>
            {/* <p contentEditable={true} spellCheck={false} onInput={(e) => setEditedTitle(e.target.textContent)}
            style={{fontSize: '2rem'}}>{editedTitle}</p> */}
            <input type="text" value={editedTitle} spellCheck={false} onChange={handleChange} style={{fontSize: '1.8rem', border: 'none', textAlign: 'center'}}/>
            <p className='dateTime'>{formattedDate} </p>
            <br/>
            <p className='description' contentEditable={true} spellCheck={false}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates, quae cupiditate dignissimos ex omnis ipsum nisi corporis nam ipsa laboriosam illum consectetur earum fuga quasi rem. Modi esse quos nesciunt.</p>
            <button onClick={saveTask} className='saveButton'>
              <IoMdAddCircle className='icons' style={{marginRight: '3px', marginTop: '-3px'}}/>
              Save Task
              </button>
            <button onClick={removeTask} className='deleteButton'>
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
