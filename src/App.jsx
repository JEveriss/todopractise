import { useState } from "react";
import { nanoid } from "nanoid";
import FilterButton from "./components/FilterButton";
import Form from "./components/Form";
import Todo from "./components/Todo";

const FILTER_MAP = {
  // The values of FILTER_MAP are functions that will be used to filter the tasks data array:
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

// FILTER_NAMES are being defined outside our App() function because if they were defined inside it,
// they would be recalculated every time the <App /> component re-renders
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
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

  // <FilterButton /> should report whether it is currently pressed,
  // and it should be pressed if its name matches the current value of filter state.
  // and it needs a callback to set the active filter. We can make direct use of setFilter hook.
  const filtersButtonsList = FILTER_NAMES?.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  // A task should only render if it is included in the results of applying the selected filter
  // Before mapping the tasks state, .filter() is added, checking which filter from the FILTERS_MAP
  // is currently active
  const taskList = tasks
    ?.filter(FILTER_MAP[filter])
    ?.map((task) => (
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
