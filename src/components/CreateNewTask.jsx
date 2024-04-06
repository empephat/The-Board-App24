import { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";

const CreateNewTask = ({ handleAddTask }) => {
  const [inputValue, setInputValue] = useState("");
  const [shake, setShake] = useState(false);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClick = () => {
    if (!inputValue.trim()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } else {
      handleAddTask();
      setInputValue("");
    }
  };

  return (
    <div className="createNewTaskContainer">
      <input
        className="createNewInput"
        id="newTaskInput"
        type="text"
        placeholder=" Add your new task here.."
        value={inputValue}
        onChange={handleChange}
      />
      <button className={`createNewButton ${shake ? "shake" : ""}`} onClick={handleClick}>
        <IoMdAddCircle className="icons" />
        Add Task
      </button>
    </div>
  );
};

export default CreateNewTask;
