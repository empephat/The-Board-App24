import { Droppable } from 'react-beautiful-dnd';
import React from 'react';
import Card from './Card';
import CreateNewTask from './CreateNewTask';

const Column = ({ title, tasks, id, handleAddTask, handleDeleteTask }) => {
  return (
    <div className="columnContainer">
      <p className='title'>{title}</p>
      
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              // Change background when you are moving a task
              background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
              // Make sure the container is filled so it's easier to drag
              width: "100%",
              height: "100%"
            }}
          >
            {tasks.map((task, index) => (
              <Card key={task.id} index={index} task={task} title={title}  handleDeleteTask={handleDeleteTask}/>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {id === "1" && (
        <CreateNewTask handleAddTask={handleAddTask}/>
      )}
    </div>
  );
}

export default Column;