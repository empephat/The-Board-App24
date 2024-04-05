import { IoMdAddCircle } from "react-icons/io";


const CreateNewTask = ({handleAddTask}) => {
  return (
    <>
    <input className='createNewInput' id='newTaskInput' type="text" placeholder='Add your new task here..' />
    <button className='createNewButton' onClick={handleAddTask} style={{backgroundColor: '#fce235'}}><IoMdAddCircle className="icons" style={{marginTop: '-3px'}}/> 
    Add Task
    </button>
    </>
  )
}

export default CreateNewTask