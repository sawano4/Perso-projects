import { createElement } from "../functions/dom.js"

/**
 * @typedef {object} Todo 
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
 */
export class Todolist {
    /**
     * @type {Todo[]}
     */
     #todos = []
    /**
     * @type {HTMLUListElement}
     */
     #listelement = []
    /**
      * @param {Todo[]} todos 
      */
      constructor(todos){
          this.#todos = todos
      }
     /**
      * 
      * @param {HTMLElement} element 
      */
      appendTo(element){
        element.innerHTML = `<form class="d-flex pb-4">
        <input required="" class="form-control" type="text" placeholder="Acheter des patates..." name="title" data-com.bitwarden.browser.user-edited="yes">
        <button class="btn btn-primary">Ajouter</button>
    </form>
    <main>
        <div class="btn-group mb-4" role="group">
            <button type="button" class=" btn btn-outline-primary active" data-filter="all">Toutes</button>
            <button type="button" class=" btn btn-outline-primary" data-filter="todo">A faire</button>
            <button type="button" class=" btn btn-outline-primary" data-filter="done">Faites</button>
        </div>
        <ul class="list-group">
            </ul>
        </main>
    
        `
         this.#listelement = element.querySelector('.list-group')
        for (let todo of this.#todos){
            const t = new TodolistItem(todo)
            this.#listelement.append(t.element)
        }
        
        element.querySelector('form').addEventListener('submit',e => this.onSubmit(e))
        element.querySelectorAll('.btn-group button').forEach(button =>{
            button.addEventListener('click',e => this.#toggleFilter(e))
        } )
     
      }
    
       
      /**
       * 
       * @param {SubmitEvent} e 
       */
      onSubmit(e){
       e.preventDefault()
       const form = e.currentTarget
       const title = new FormData(form).get('title').toString().trim()
       if(title === ''){
        return
       }
       const todo = {
        id: Date.now(),
        title,
        completed: false
       }
       const item = new TodolistItem(todo)
      this.#listelement.prepend(item.element)
      form.reset()
    }
    /**
     * 
     * @param {PointerEvent} e 
     */
    #toggleFilter(e) {
        e.preventDefault();
        const filter = e.currentTarget.getAttribute('data-filter');
        e.currentTarget.parentElement.querySelector('.active').classList.remove('active');
        e.currentTarget.classList.add('active');
        if (filter === 'todo') {
            this.#listelement.classList.add('hide-completed');
            this.#listelement.classList.remove('hide-todo'); // Fix the typo here
        } else if (filter === 'done') {
            this.#listelement.classList.add('hide-todo');
            this.#listelement.classList.remove('hide-completed'); // Fix the typo here
        } else {
            this.#listelement.classList.remove('hide-todo');
            this.#listelement.classList.remove('hide-completed');
        }
    }
    

}

class TodolistItem{
    #element
/**@type {Todo} */
constructor (todo){
 const id = `todo-${todo.id}`   
const li = createElement('li',
  {
    class: 'todo list-group-item d-flex align-items-center'
    }
 )
 this.#element = li
  const checkbox = createElement('input',
  {
     type: 'checkbox',
     class: 'form-check-input',
     id,
     checked: todo.completed ? '' : null
     
  })
   const label = createElement('label',
   {
    class: 'ms-2 form-check-label',
    for: id
   })
    label.innerText= todo.title
   const button = createElement('i',
   {
    class:'ms-auto btn btn-danger btn-sm'
   })
   button.innerHTML = `<i class="bi-trash">
   </i>`



  li.append(checkbox)
  li.append(label)
  li.append(button)
  this.toggle(checkbox)

  button.addEventListener('click',e => this.remove(e))
  checkbox.addEventListener('change',e =>this.toggle(e.currentTarget))
   
}
/**
 * 
 * @return {HTMLElement} element 
 */
get element(){
    return this.#element
}
/**
 * 
 * @param {PointerEvent} e 
 */
remove(e){
    e.preventDefault()
    this.#element.remove()

}
/**
 * chnage l'état (a faire.fait) de la tache
 * @param {HTMLInputElement} checkbox 
 */
toggle(checkbox){
    if(checkbox.checked){
         this.#element.classList.add('is-completed')
    }else{
        this.#element.classList.remove('is-completed')
    }
}

}