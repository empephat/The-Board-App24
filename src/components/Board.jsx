//Drag & Drop
import { DragDropContext } from 'react-beautiful-dnd';
//React
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
//Components
import Column from './Column';
import BoardContent from './BoardContent';
import CreateNewTask from './CreateNewTask';
//Data
import api from '../api/tasks'

const Board = () => {
  const [inComplete, setInComplete] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [complete, setComplete] = useState([]);

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
    document.getElementById("newTaskInput").value = ""; 
  };

  const handleSaveChanges = (taskId, updatedTask, editedTitle) => {
    // Determine the column ID of the updated task
    const columnId = updatedTask.completed ? (updatedTask.id % 2 === 0 ? '2' : '3') : '1';
    // Update the appropriate column state based on the column ID
    switch (columnId) {
      case '1': // TO DO column
        setInComplete(prevTasks => prevTasks.map(prevTask => (prevTask.id === taskId ? { ...updatedTask, title: editedTitle } : prevTask)));
        break;
      case '2': // IN PROGRESS column
        setInProgress(prevTasks => prevTasks.map(prevTask => (prevTask.id === taskId ? { ...updatedTask, title: editedTitle } : prevTask)));
        break;
      case '3': // DONE column
        setComplete(prevTasks => prevTasks.map(prevTask => (prevTask.id === taskId ? { ...updatedTask, title: editedTitle } : prevTask)));
        break;
      default:
        break;
    }
  };

  const handleDeleteTask = (taskId) => {
    setInComplete(prevState => prevState.filter(task => task.id !== taskId));
    setInProgress(prevState => prevState.filter(task => task.id !== taskId));
    setComplete(prevState => prevState.filter(task => task.id !== taskId));
  };

  return (
    <main className='content'>
    <Router>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className='boardContainer'>
          <Routes>
            <Route path="/" element={
            <BoardContent inComplete={inComplete} inProgress={inProgress} complete={complete} 
            handleAddTask={handleAddTask} handleDeleteTask={handleDeleteTask} handleSaveChanges={handleSaveChanges} />} />
            <Route path="/todo" element={
            <Column title={<Link to="/todo">TO DO</Link>} tasks={inComplete} id="1" 
            handleAddTask={handleAddTask} handleDeleteTask={handleDeleteTask} handleSaveChanges={handleSaveChanges} />} />
            <Route path="/inprogress" element={
            <Column title={<Link to="/inprogress">IN PROGRESS</Link>} tasks={inProgress} id="2" 
            handleDeleteTask={handleDeleteTask} handleSaveChanges={handleSaveChanges} />} />
            <Route path="/done" element={
            <Column title={<Link to="/done">DONE</Link>} tasks={complete} id="3" 
            handleDeleteTask={handleDeleteTask} handleSaveChanges={handleSaveChanges} />} />
          </Routes>
        </div>
      </DragDropContext>
    </Router>
    <div className="createNewTaskContainer">
        <CreateNewTask handleAddTask={handleAddTask}/>
      </div>
    </main>
  );  
};

export default Board;
