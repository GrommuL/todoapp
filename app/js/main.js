
let dataTodo = [{
    id: 1,
    text:'Купить хлеб',
    isDone: true,
    isImportant: false,
    isChange: false
},
{
    id: 2,
    text:'Погладить кошку',
    isDone: false,
    isImportant: false,
    isChange: false
},{
    id: 3,
    text:'Принять душ',
    isDone: false,
    isImportant: false,
    isChange: false
}]

const todoButton = document.querySelector('.todo-button')
const overlay = document.querySelector('.overlay')
const overlayCloseButton = document.querySelector('.popup__form-close')
const todoList = document.querySelector('.content__list')
const todoForm = document.querySelector('.popup__form')
const todoInput = document.querySelector('.popup__form-input')
const todoAddButton = document.querySelector('.popup__form-button')
const todoNotificationComplete = document.querySelector('.popup__form-complete')




/* Show popup */

todoButton.addEventListener( 'click', () => {
    overlay.style.display = 'block'
})

overlayCloseButton.addEventListener( 'click', () => {
    overlay.style.display = 'none'
})

/* Hide popup */

overlay.addEventListener( 'click', (event) => {
    if(event.target.className.includes('overlay')){
        overlay.style.display = 'none'
    }
})

/* Render all tasks */


function addDataForList(){
    todoList.innerHTML = ''
    dataTodo.forEach(item => {
        todoList.innerHTML += `
    <li class="content__list-item" data-id="${item.id}">
    <div class="content__list-item-left">
        <button class="content__list-item-done" type="button" data-id="${item.id}">${item.isDone ? `<svg><use xlink:href="sprite.svg#complete"></use></svg>` : `<svg><use xlink:href="sprite.svg#check"></use></svg>`}</button>
        <span class="content__list-item-text" data-id="${item.id} style="text-decoration: ${item.isDone ? 'line-through' : 'none'}; color: ${item.isDone ? 'gray' : '$white'}; display: ${item.isChange ? 'none' : 'inline'}">${item.text}</span>
        <input class="content__list-item-input" data-id="${item.id} style="display: ${item.isChange ? 'inline-block' : 'none'}" type="text" value="${item.text}">
    </div>
    <div>
    <button class="content__list-item-cancel" data-id="${item.id}"><svg><use xlink:href="sprite.svg#close"></use></svg></button>
    <button class="content__list-item-save">Save</button>
    </div>
</li>
    `
    })

        /* Edit a task */

        let todoEditText = document.querySelectorAll('content__list-item-text')
        Array.from(todoEditText).forEach(btn =>{
            btn.addEventListener('click', (e)=>{
                    dataTodo = dataTodo.map(item => {
                        if(item.id === +btn.getAttribute('data-id')){
                            return {...item, isChange: true}
                        }
                        return item
                    })
                    addDataForList()
            })
        })

        /* Complete a task */

        let todoCompleteTask = document.querySelectorAll('.content__list-item-done')
        Array.from(todoCompleteTask).forEach(btn =>{
            btn.addEventListener('click', (e)=>{
                    dataTodo = dataTodo.map(item => {
                        if(item.id === +btn.getAttribute('data-id')){
                            return {...item, isDone: !item.isDone}
                        }
                        return item
                    })
                    addDataForList()
            })
        })
        /* Delete a task */

        let todoDeleteTask = document.querySelectorAll('.content__list-item-cancel')
        Array.from(todoDeleteTask).forEach(btn =>{
            btn.addEventListener('click', ()=>{
                dataTodo = dataTodo.filter(el => {
                    return el.id !== +btn.getAttribute('data-id')
                })
                addDataForList()
            })
        })
}

addDataForList()


/* Create and submit a new task */

todoForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    dataTodo = [...dataTodo,{
        id: dataTodo.length ? dataTodo.at(-1).id + 1 : 1,
        text: todoInput.value,
        isDone: false,
        isImportant: false,
        isChange: false
    }]
    todoInput.value = ''
    todoNotificationComplete.style.visibility = 'visible'
    setTimeout(() => {
        todoNotificationComplete.style.visibility = 'hidden'
    }, 400);
    addDataForList()
})







