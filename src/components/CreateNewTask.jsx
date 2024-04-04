import React from 'react'


const CreateNewTask = ({handleAddTask}) => {
  return (
    // Lägg till icon
    <>
    <input className='createNewInput' id='newTaskInput' type="text" placeholder='Write your new task here..' />
    <button className='createNewButton' onClick={handleAddTask}>Add Task</button>
    </>
  )
}

export default CreateNewTask