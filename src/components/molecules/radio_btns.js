export const list = () => {
  return `
    <form name="todolist">
      <div class="radio-chocie" id="todoChoice">
        <h2>Select Option</h2>
        <ul>
          <li>
            <input name="todo-radio-group" type="radio" id="toDoBtn" value="to-do">
            <label for="toDoBtn">To Do</label>
          </li>
          <li>
            <input name="todo-radio-group" type="radio" id="inProgressBtn" value="in-progress">
            <label for="inProgressBtn">In Progress</label>
          </li>
          <li>
            <input name="todo-radio-group" type="radio" id="completedBtn" value="completed">
            <label for="completedBtn">Completed</label>
          </li>
        </ul>
      </div>
    </form>
  `
}