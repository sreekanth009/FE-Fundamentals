import "../src/styles/app.scss";
import {list} from './components/molecules/radio_btns';
import {todoInput} from './components/atoms/input';
import {itemList} from './components/atoms/item_list';

function component() {
  const element = document.getElementById('todoApp');
  element.innerHTML = `${list()} ${todoInput()} ${itemList()}`;
  return element;
}

document.body.appendChild(component());

// Arrays
const data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
  toDo: [],
  inProgress: [],
  completed: [],
}

// Render all list
renderAllList();

// Add items to list
document.getElementById('addItem').addEventListener('click', function() {
  const inputVal = document.getElementById('itemList').value;

  if (inputVal) {
    if (document.getElementById('toDoBtn').checked) {
      data.toDo.push(inputVal);
    }
    if (document.getElementById('inProgressBtn').checked) {
      data.inProgress.push(inputVal);
    }
    if (document.getElementById('completedBtn').checked) {
      data.completed.push(inputVal);
    }
    /* Update data */
    dataObjectUpdate();
  }

  if ((document.getElementById('toDoBtn').checked === false) 
    && (document.getElementById('inProgressBtn').checked === false) 
    && (document.getElementById('completedBtn').checked === false)) {
      alert ( "Please choose an option from above" );
      document.getElementById('itemList').value = '';
  } else {
    if (inputVal) {
      addItemToDo(inputVal);
      inProgressListItem(inputVal);
      completedListItem(inputVal);
      /* Clear input */
      document.getElementById('itemList').value = '';
    }
  }
});

// Render All list function
function renderAllList() {
  // debugger;
  if (!data.toDo.length && !data.inProgress.length && data.completed.length) return;

  for (let i = 0; i < data.toDo.length; i++) {
    const value = data.toDo[i];
    addItemToDo(value);
  }
  for (let j = 0; j < data.inProgress.length; j++) {
    const value = data.inProgress[j];
    inProgressListItem(value, false);
  }
  for (let k = 0; k < data.completed.length; k++) {
    const value = data.completed[k];
    completedListItem(value, false);
  }
}

// Store data in local storage
const dataObjectUpdate = () => {
  localStorage.setItem('todoList', JSON.stringify(data));
}

// Add item to to do list
function addItemToDo(todoText, inProgress) {
  const toDoList = (inProgress) ? document.getElementById('inProgress') : document.getElementById('toDo');

  /* Create a todo list item */
  const todoItem = document.createElement('li');
  todoItem.innerText = todoText;

  (inProgress) ? '' : toDoList.appendChild(todoItem, toDoList.childNodes[0]);

  /* Selected option value */
  if (document.getElementById('toDoBtn').checked) {
    toDoList.appendChild(todoItem, toDoList.childNodes[0]); 
  }
}

// const addItemToDo = (todoText, inProgress) => {
//   const toDoList = (inProgress) ? document.getElementById('inProgress') : document.getElementById('toDo');

//   /* Create a todo list item */
//   const todoItem = document.createElement('li');
//   todoItem.innerText = todoText;
  
//   toDoList.appendChild(todoItem, toDoList.childNodes[0]);

//   /* Selected option value */
//   if (document.getElementById('toDoBtn').checked) {
//     toDoList.appendChild(todoItem, toDoList.childNodes[0]); 
//   }
// }

// Add item to in progress list
function inProgressListItem(inProgressText, completed) {
  const inProgressList = (completed) ? document.getElementById('completed') : document.getElementById('inProgress');

  /* Create a in progress list item */
  const inProgressItem = document.createElement('li');
  inProgressItem.innerText = inProgressText;

  (completed) ? '' : inProgressList.appendChild(inProgressItem, inProgressItem.childNodes[0]);

  /* Selected option value */
  if (document.getElementById('inProgressBtn').checked) {
    inProgressList.appendChild(inProgressItem, inProgressItem.childNodes[0]);
  }
}

// Add item to in progress list
function completedListItem(completedText, toDo) {
  const completedList = (toDo) ? document.getElementById('toDo') : document.getElementById('completed');

  /* Create a in progress list item */
  const completedItem = document.createElement('li');
  completedItem.innerText = completedText;

  (toDo) ? '' : completedList.appendChild(completedItem, completedItem.childNodes[0]);

  /* Selected option value */
  if (document.getElementById('completedBtn').checked) {
    completedList.appendChild(completedItem, completedItem.childNodes[0]);
  }
}