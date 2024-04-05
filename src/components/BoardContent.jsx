import Column from './Column';
import { Link } from  'react-router-dom'

const BoardContent = ({ inComplete, inProgress, complete, handleAddTask, handleDeleteTask }) => {
    return (
      <>
        <Column title={<Link to="/todo">TO DO</Link>} tasks={inComplete} id="1" handleAddTask={handleAddTask} handleDeleteTask={handleDeleteTask} />
        <Column title={<Link to="/inprogress">IN PROGRESS</Link>} tasks={inProgress} id="2" handleDeleteTask={handleDeleteTask} />
        <Column title={<Link to="/done">DONE</Link>} tasks={complete} id="3" handleDeleteTask={handleDeleteTask} />
      </>
    );
  };

export default BoardContent;