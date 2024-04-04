import { DragDropContext } from 'react-beautiful-dnd';
import { React, useState, useEffect } from 'react';
import Column from './Column';
import api from '../api/tasks'

const Board = () => {
  const [inComplete, setInComplete] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [complete, setComplete] = useState([]);

  // JSON Placeholder with a random todo list
  // useEffect(() => {
  //   
  //   const limit = 10; 
  //   fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`)
  //     .then((response) => response.json())
  //     .then((json) => {
  //       setInComplete(json.filter((task) => !task.completed));
  //       setInProgress(json.filter((task) => task.completed && task.id % 2 === 0)); 
  //       setComplete(json.filter((task) => task.completed && task.id % 2 !== 0));
  //     });
  // }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks');
        const tasks = response.data;

        setInComplete(tasks.filter(task => !task.completed));
        setInProgress(tasks.filter(task => task.completed && task.id % 2 === 0));
        setComplete(tasks.filter(task => task.completed && task.id % 2 !== 0));
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };
    fetchTasks();
  }, []);
  
  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    // Do nothing if the task isn't moved
    if (!destination) return;
    // If dropped in the same column, do nothing
    if (destination.droppableId === source.droppableId) return;
    // Find the source and destination column IDs
    const sourceColumnId = source.droppableId;
    const destinationColumnId = destination.droppableId;
    // Find the task based on the source column ID
    let task;
    switch (sourceColumnId) {
      case '1': // TO DO column
        task = inComplete[source.index];
        break;
      case '2': // IN PROGRESS column
        task = inProgress[source.index];
        break;
      case '3': // DONE column
        task = complete[source.index];
        break;
      default:
        break;
    }

    // Remove the task from the source column
    switch (sourceColumnId) {
      case '1': // TO DO column
        setInComplete(prevState => prevState.filter((_, index) => index !== source.index));
        break;
      case '2': // IN PROGRESS column
        setInProgress(prevState => prevState.filter((_, index) => index !== source.index));
        break;
      case '3': // DONE column
        setComplete(prevState => prevState.filter((_, index) => index !== source.index));
        break;
      default:
        break;
    }

    // Add the task to the destination column
    switch (destinationColumnId) {
      case '1': // TO DO column
        setInComplete(prevState => [...prevState.slice(0, destination.index), task, ...prevState.slice(destination.index)]);
        break;
      case '2': // IN PROGRESS column
        setInProgress(prevState => [...prevState.slice(0, destination.index), task, ...prevState.slice(destination.index)]);
        break;
      case '3': // DONE column
        setComplete(prevState => [...prevState.slice(0, destination.index), task, ...prevState.slice(destination.index)]);
        break;
      default:
        break;
    }
  };

  const handleAddTask = () => {
    const newTaskTitle = document.getElementById("newTaskInput").value;
    // Do nothing if task title is empty or contains only whitespace
    if (!newTaskTitle.trim()) return; 
    // Get the maximum ID from existing tasks
    const lastTaskId = Math.max(...inComplete.map(task => task.id)); 
    // Increment the last ID by 1
    const newTaskId = lastTaskId + 1; 
    const newTask = {
      id: newTaskId,
      title: newTaskTitle,
      completed: false
    };
    setInComplete(prevState => [...prevState, newTask]);
    // Clear the input field
    document.getElementById("newTaskInput").value = ""; 
  };



  return (
    <>
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className='boardContainer'>
        <Column title={"TO DO"} tasks={inComplete} id={"1"} handleAddTask={handleAddTask}/>
        <Column title={"IN PROGRESS"} tasks={inProgress} id={"2"} />
        <Column title={"DONE"} tasks={complete} id={"3"} />
      </div>
    </DragDropContext>
    </>
  );  
};

export default Board;