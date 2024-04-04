import { Draggable } from 'react-beautiful-dnd';
import React from 'react';

const Card = ({ task, index }) => {
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
          className='taskContainer'
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
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default Card;
