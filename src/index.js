import "../src/styles/app.scss";
import { list } from './components/molecules/radio_btns';
import { todoInput } from './components/atoms/input';
import { itemList } from './components/atoms/item_list';
import { deleteItem, paragraphText } from './components/atoms/delete_item';

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

// toDo app Namespacing and RMP
const toDo = (() => {
  // Render all the list items from the local storage
  const initialListRender = () => {
    if (!data.toDo.length && !data.inProgress.length && data.completed.length) return;
    keys.forEach((key) => {
      const list = data[key];
      list.forEach((item) => {
        addItemToList(item, key);
      });
    });
  }

  // Set multiple attributes
  const setAttributes = (element, attributes) => {
    Object.keys(attributes).forEach(function (name) {
      element.setAttribute(name, attributes[name]);
    })
  }

  // Common function for adding items to toDO, inProgress, Completed list
  const addItemToList = (inputVal, key) => {
    const allItemList = document.querySelector(`#${key}`);
    /* Create a todo list item */
    const item = document.createElement('li');
    allItemList.appendChild(item, allItemList.childNodes[0]);
    setAttributes(item, {
      'data-value': inputVal,
      'id': inputVal,
      'draggable': 'true'
    });

    item.innerHTML = `${paragraphText(inputVal)} ${deleteItem(inputVal)}`;
    return allItemList;
  }

  // Add items to list
  const addListItem = () => {
    const inputVal = document.querySelector('#enterList').value;
    let key = '';
    /* Update local storge data */
    if (inputVal) {
      key = document.querySelector('[name="todo-radio-group"]:checked').value;
      data[key].push(inputVal);
      updateLocalStorage();
    }

    if (!document.querySelector('[name="todo-radio-group"]:checked')) {
      alert("Please choose an option from above");
      document.querySelector('#enterList').value = '';
    } else if (inputVal === '') {
      alert("Please enter a value");
    } else {
      if (inputVal) {
        addItemToList(inputVal, key);
        /* Clear input */
        document.querySelector('#enterList').value = '';
      }
    }
  }

  // Remove items from list
  const removeListItem = () => {
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
  }

  // Event handlers for Add and Remove items
  const eventHandlers = () => {
    document.body.addEventListener('click', function (event) {
      if (event.target.id === 'addItem') {
        addListItem();
      }
      if (event.target.className === 'delete-item') {
        removeListItem();
      }
    });
    document.body.addEventListener('keyup', function (event){
      if (event.keyCode === 13) {
        addListItem();
      }
    });
  }

  // App Bundling
  const init = () => {
    document.body.appendChild(component());
    initialListRender();
    eventHandlers();
  }

  // Drag and Drop
  const dragEle = () => {
    document.body.addEventListener('dragstart', function(event) {
      event.dataTransfer.setData("text/plain", event.target.id);
    });
  }

  const dragOverEle = () => {
    document.body.addEventListener("dragover", function(event) {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    });
  }

  const dropTargetEle = () => {
    document.body.addEventListener("drop", function(event) {
      event.preventDefault();
      if (event.target.className.includes('drop-element')) {
        const data = event.dataTransfer.getData("text");
        event.target.appendChild(document.getElementById(data));
      }
    });
  }

  // Drag and drop bundling
  const dragDropInteraction = () => {
    dragEle();
    dragOverEle();
    dropTargetEle();
  }

  return {
    appInit: init,
    dragDrop: dragDropInteraction
  }
})();

toDo.appInit();
toDo.dragDrop();
