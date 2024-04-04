import { IoMdAddCircle } from "react-icons/io";


const CreateNewTask = ({handleAddTask}) => {
  return (
    // Lägg till icon
    <>
    <input className='createNewInput' id='newTaskInput' type="text" placeholder='Write your new task here..' />
    <button className='createNewButton' onClick={handleAddTask} style={{backgroundColor: '#68ff68'}}><IoMdAddCircle className="icons" style={{marginTop: '-3px'}}/> Add Task</button>
    </>
  )
}

export default CreateNewTask