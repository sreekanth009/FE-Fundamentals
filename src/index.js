import "../src/styles/app.scss";
import {list} from './components/molecules/radio_btns';
import {todoInput} from './components/atoms/input';
import {itemList} from './components/atoms/item_list';

function component() {
  const element = document.getElementById('todoApp');
  element.innerHTML = `${list()} ${todoInput()} ${itemList()}`;
  return element;
}
// Main render
document.body.appendChild(component());

// Arrays
const data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
  toDo: [],
  inProgress: [],
  completed: [],
}

// Add items to list
document.getElementById('addItem').addEventListener('click', function() {
  const inputVal = document.getElementById('itemList').value;

  if (inputVal) {
    const key = document.querySelector('[name="todo-radio-group"]:checked').value;
    data[key].push(inputVal);
    /* Update data */
    updateLocalStorage();
  }

  if ((document.getElementById('toDoBtn').checked === false)
    && (document.getElementById('inProgressBtn').checked === false)
    && (document.getElementById('completedBtn').checked === false)) {
      alert ( "Please choose an option from above" );
      document.getElementById('itemList').value = '';
  } else {
    if (inputVal) {
      if (document.getElementById('toDoBtn').checked) {
        addItemToDo(inputVal);
      }
      if (document.getElementById('inProgressBtn').checked) {
        inProgressListItem(inputVal);
      }
      if (document.getElementById('completedBtn').checked) {
        completedListItem(inputVal);
      }
      /* Clear input */
      document.getElementById('itemList').value = '';
    }
  }
});

// Render All list function
function renderAllList() {
  if (!data.toDo.length && !data.inProgress.length && data.completed.length) return;

  const keys = Object.keys(data);

  keys.forEach((key) => {
    const list = data[key];
    list.forEach((item) => {
      addItemToDo(item);
      inProgressListItem(item);
      completedListItem(item);
    });
  });
}

// Store data in local storage
const updateLocalStorage = () => {
  localStorage.setItem('todoList', JSON.stringify(data));
}

// Add item to to do list
function addItemToDo(todoText, inProgress) {
  const toDoList = (inProgress) ? document.getElementById('inProgress') : document.getElementById('toDo');

  /* Create a todo list item */
  const todoItem = document.createElement('li');
  todoItem.innerText = todoText;

  /* Selected option value */
  if (document.getElementById('toDoBtn').checked || data.toDo.length) {
    toDoList.appendChild(todoItem, toDoList.childNodes[0]);
  }
}

// Add item to in progress list
function inProgressListItem(inProgressText, completed) {
  const inProgressList = (completed) ? document.getElementById('completed') : document.getElementById('inProgress');

  /* Create a in progress list item */
  const inProgressItem = document.createElement('li');
  inProgressItem.innerText = inProgressText;

  /* Selected option value */
  if (document.getElementById('inProgressBtn').checked || data.inProgress.length) {
    inProgressList.appendChild(inProgressItem, inProgressItem.childNodes[0]);
  }
}

// Add item to in progress list
function completedListItem(completedText, toDo) {
  const completedList = (toDo) ? document.getElementById('toDo') : document.getElementById('completed');

  /* Create a in progress list item */
  const completedItem = document.createElement('li');
  completedItem.innerText = completedText;

  /* Selected option value */
  if (document.getElementById('completedBtn').checked || data.completed.length) {
    completedList.appendChild(completedItem, completedItem.childNodes[0]);
  }
}

// Render all list
renderAllList();