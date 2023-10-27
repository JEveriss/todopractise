import { useState } from "react";
import { nanoid } from "nanoid";
import FilterButton from "./components/FilterButton";
import Form from "./components/Form";
import Todo from "./components/Todo";

const filtersArr = ["All", "Active", "Completed"];

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
    alert(name);
  }

  function deleteTask(id){
    const remainingTasks = tasks.filter((task) => id !== task.id)
    setTasks(remainingTasks)
  }

  function editTask(id, newName){
    const editedTaskList = tasks.map((task)=>{
      if (id === task.id){
        return {...task, name: newName}
      }
      return task
    })
    setTasks(editedTaskList)
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use spread operator for a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  const filtersButtonsList = filtersArr?.map((filter, i) => (
    <FilterButton key={i} action={filter} />
  ));

  const taskList = tasks?.map((task) => (
    <Todo
      key={task.id}
      name={task.name}
      completed={task.completed}
      id={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const taskNouns = taskList.length === 1 ? "task" : "tasks";
  const headingText = `${taskList.length} ${taskNouns} left`;

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filtersButtonsList}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}
export default App;
