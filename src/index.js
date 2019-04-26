import "../src/styles/app.css";
import {list} from './components/atoms/list';

function component() {
  const element = document.getElementById('app');
  element.innerHTML = list();

  return element;
}

document.body.appendChild(component());