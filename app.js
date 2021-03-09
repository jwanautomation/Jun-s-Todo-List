// SELECTORS
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addToDo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// FUNCTIONS

function addToDo(event){
    // PREVENT FORM FROM 
    event.preventDefault();

    // console.log("Hello World");

    // TODO DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // CREATE LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // ADD TODO TO LOCALSTORAGE
    saveLocalTodos(todoInput.value);

    // COMPLETED BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // TRASH BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // APPEND TO TO-DO LIST
    todoList.appendChild(todoDiv);

    // CLEAR TODO INPUT VALUE
    todoInput.value = "";
}

// BUTTON FUNCTIONS
function deleteCheck(e){
    // console.log(e.target);
    
    const item = e.target;

    // DELETE TODO
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;

        // ANIMATION - REMOVES HIDDEN ITEM
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    // CHECK ICON
    if(item.classList[0] === 'complete-btn'){
        const todo =  item.parentElement;
        todo.classList.toggle('completed');
    }
}

// FILTER TODO FUNCTION
function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        // TARGET IS VALUE THEREFORE ANY 3 OPTIONS CAN BE SELECTED
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            // CHECK IF THE CASE ! ISN'T CHECKED
            case "not-completed":
                if(!todo.classList.contains('completed')){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

// SAVE TO LOCALSTORAGE
function saveLocalTodos(todo){
    // CHECK IF STORED
    let todos;
    // IF LOCALSTORAGE IS NULL (EMPTY)
    if(localStorage.getItem('todos') === null) {
        // CREATE AN EMPTY ARRAY
        todos = [];
    } else {
        // PARSE INTO AN ARRAY
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    // PUSH INTO LOCALSTORAGE
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// FETCH TODOS
function getTodos(){
    // CHECK IF STORED
    let todos;
    // IF LOCALSTORAGE IS NULL (EMPTY)
    if(localStorage.getItem('todos') === null) {
        // CREATE AN EMPTY ARRAY
        todos = [];
    } else {
        // PARSE INTO AN ARRAY
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    // FOR EACH LOOP
    todos.forEach(function(todo){
    // TODO DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // CREATE LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // COMPLETED BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // TRASH BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // APPEND TO TO-DO LIST
    todoList.appendChild(todoDiv);

    });
}

// REMOVE TODOS FROM LOCALSTORAGE
function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    // GET INDEX OF THE ITEM
    /*
        - CLICK DELETE (CLICKING ON THE DIV)
        - ACCESS THE TODOS INDEX OF (ITEM) I.E THE POSITION
        - SPLICE USED TO REMOVE THE INDEX OF (ITEM)
        - 1 SPECIFIES ONE SINGLE ELEMENT
    */
    const todoIndex = todo.children[0].innerText;
    // console.log(todo.children[0].innerText);
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// CLEAR LOCALSTORAGE
// localStorage.clear();