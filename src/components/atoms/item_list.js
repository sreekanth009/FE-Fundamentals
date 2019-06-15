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
      <ul class="todo-list" id="toDo">
      </ul>
      <ul class="in-progress drop-target-ele" id="inProgress">
      </ul>
      <ul class="completed" id="completed">
      </ul>
      <div class="drop-target">
        <p class="drag-target" draggable="true" id="dragtarget">Drag this content</p>
      </div>
      <div class="drop-target"></div>
    </div>
  </div>
  `
}