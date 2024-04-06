import { useContext, useMemo, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';
import ColorChangeContext from "./ColorChangeContext";

const Column = ({ title, tasks, id, handleSaveChanges, handleDeleteTask }) => {
  const { isColorChange } = useContext(ColorChangeContext);

  const columnStyle = useMemo(() => ({
    backgroundColor: isColorChange ? 'var(--orange-bg-color)' : 'var(--blue-bg-color)',
  }), [isColorChange]);

  return (
    <div className='columnContainer' style={columnStyle}>
      <p className='title'>{title}</p>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
              width: "100%",
              height: "100%"
            }}
          >
            {tasks.map((task, index) => (
              <Card 
              key={task.id} 
              index={index} 
              task={task} 
              title={title} 
              handleSaveChanges={handleSaveChanges} 
              handleDeleteTask={handleDeleteTask}/>
            ))}
              {provided.placeholder}
          </div>
        )}
      </Droppable>
 
    </div>
  );
}

export default Column;