import "../src/styles/app.scss";
import {list} from './components/molecules/radio_btns';
import {todoInput} from './components/atoms/input';
import {itemList} from './components/atoms/item_list';
import {deleteItem, paragraphText} from './components/atoms/delete_item';

// DOM elements construction
const component = () => {
  const element = document.querySelector('#todoApp');
  element.innerHTML = `${list()} ${todoInput()} ${itemList()}`;
  return element;
}

// Local storage data object
const data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
  toDo: [],
  inProgress: [],
  completed: [],
}

// Store data in local storage
const updateLocalStorage = () => {
  localStorage.setItem('todoList', JSON.stringify(data));
}

// Data object keys
const keys = Object.keys(data);

const toDo = {
  // Render all the list items from the local storage
  renderAllList: function() {
    if (!data.toDo.length && !data.inProgress.length && data.completed.length) return;
    keys.forEach((key) => {
      const list = data[key];
      list.forEach((item) => {
        this.addItemToList(item, key);
      });
    });
  },

  // Set multiple attributes
  setAttributes: function(element, attributes) {
    Object.keys(attributes).forEach(function(name) {
      element.setAttribute(name, attributes[name]);
    })
  },

  // Set draggable attribute
  setDraggableAttr: function(item) {
    toDo.setAttributes(item, {
      'draggable': 'true',
    });
  },

  // Common function for adding items to toDO, inProgress, Completed list
  addItemToList: function(inputVal, key) {
    const allItemList = document.querySelector(`#${key}`);
    /* Create a todo list item */
    const item = document.createElement('li');
    allItemList.appendChild(item, allItemList.childNodes[0]);
    toDo.setAttributes(item, {
      'data-value': inputVal,
      'id': inputVal
    });

    if (allItemList.id === 'toDo') {
      toDo.setDraggableAttr(item);
    }
    if (allItemList.id === 'inProgress') {
      toDo.setDraggableAttr(item);
    }

    item.innerHTML = `${paragraphText(inputVal)} ${deleteItem(inputVal)}`;
    return allItemList;
  },

  // Add items to list
  addListItem: function() {
    const inputVal = document.querySelector('#enterList').value;
    let key = '';
    /* Update local storge data */
    if (inputVal) {
      key = document.querySelector('[name="todo-radio-group"]:checked').value;
      data[key].push(inputVal);
      updateLocalStorage();
    }

    if (!document.querySelector('[name="todo-radio-group"]:checked')) {
      alert ( "Please choose an option from above" );
      document.querySelector('#enterList').value = '';
    } else if (inputVal === '') {
      alert ( "Please enter a value" );
    } else {
      if (inputVal) {
        this.addItemToList(inputVal, key);
        /* Clear input */
        document.querySelector('#enterList').value = '';
      }
    }
  },

  // Remove items from list
  removeListItem: function() {
    const val = event.target.parentNode.getAttribute('data-value');
    keys.forEach((key) => {
      const list = data[key];
      const valIndex = list.indexOf(val);
      if (valIndex > -1) {
        list.splice(valIndex, 1);
        updateLocalStorage();
      }
    });
    event.target.parentNode.remove();
  },

  // Event handlers for Add and Remove items
  eventHandlers: function() {
    document.body.addEventListener('click', function (event) {
      if (event.target.id === 'addItem') {
        toDo.addListItem();
      }
      if(event.target.className === 'delete-item') {
        toDo.removeListItem();
      }
    });
  },

  // App Bundling
  init: function() {
    document.body.appendChild(component());
    this.renderAllList();
    this.eventHandlers();
  }
}

// App initialization
toDo.init();

// Drag and Drop
document.addEventListener('dragstart', function(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
});

document.addEventListener('dragenter', function(event) {
  if (event.target.className === "drop-target-ele") {
    event.target.style.border = "2px solid 0079c1";
  }
});

document.addEventListener("dragover", function(event) {
  event.preventDefault();
});

document.addEventListener("drop", function(event) {
  event.preventDefault();
  if (event.target.className === "drop-target-ele") {
    event.target.style.border = "";
    const data = event.dataTransfer.getData("text/plain", event.target.id);
    console.log('data', data);
    event.target.appendChild(document.getElementById(data));
  }
});
