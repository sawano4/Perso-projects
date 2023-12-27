import { fetchJSON } from "./functions/api.js";
import { createElement } from "./functions/dom.js";
import { Todolist } from "./components/Todolist.js";

try{

  const todos = await fetchJSON('https://jsonplaceholder.typicode.com/todos?_limit=5')
  const list = new Todolist(todos)
  list.appendTo(document.querySelector('#todolist'))

} catch(e){
  console.error('Erreur lors de la récupération des données :', e);
    const alertEle = createElement('div',{
     class : 'alert alert-danger m-2',
     role:'alert'
    })
    alertEle.innerText = 'Impossible de charger les élements'
    document.body.prepend(alertEle)
    
}

