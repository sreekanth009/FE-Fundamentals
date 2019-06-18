export const itemList = () => {
  return `
  <div class="item-list-parent" id="itemList">
    <ul class="list-headings">
      <li>
        <h3>To Do List</h3>
      </li>
      <li>
        <h3>In Progress</h3>
      </li>
      <li>
        <h3>Completed</h3>
      </li>
    </ul>
    <div class="item-list" id="itemList">
      <ul class="todo-list drop-element" id="toDo">
      </ul>
      <ul class="in-progress drop-element" id="inProgress">
      </ul>
      <ul class="completed drop-element" id="completed">
      </ul>
    </div>
  </div>
  `
}