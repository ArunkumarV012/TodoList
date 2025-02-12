let todoItemsContainer = document.getElementById("todoItemsContainer");
let addBtn = document.getElementById("addButton");
let saveBtn = document.getElementById("saveButton");

let todoList = getTodoFromLocalStorage();

let todoUniqueNo = todoList.length;

addBtn.onclick = function() {

    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;

    if (userInputValue === "") {
        alert("Enter the Valid Text");
        return;
    }

    let newTodo = {
        text: userInputValue,
        uniqueNo: todoUniqueNo + 1
    };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value = "";

}

function getTodoFromLocalStorage() {
    let stringifiedElement = localStorage.getItem("todoList");
    let parsedElement = JSON.parse(stringifiedElement);

    if (parsedElement === null) {
        return [];
    } else {
        return parsedElement;
    }

}

saveBtn.onclick = function() {

    let stringifiedElement = JSON.stringify(todoList);
    localStorage.setItem("todoList", stringifiedElement);

}

function checkTodoStatus(checkboxId, labelId, todoId) {

    let checkBox = document.getElementById(checkboxId);
    let label = document.getElementById(labelId);

    label.classList.toggle("checked");

    let checkedElement = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;

        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }

    });

    let todoElement = todoList[checkedElement];

    if (todoElement.isChecked === true) {
        todoElement.isChecked = false;
    } else {
        todoElement.isChecked = true;
    }

}

function onDeleteTodo(todoId) {

    let deleteElementId = document.getElementById(todoId);
    todoItemsContainer.removeChild(deleteElementId);

    let deleteObject = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;

        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }

    });

    todoList.splice(deleteObject, 1);

}

function createAndAppendTodo(todo) {
    let todoId = "todo" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;

    inputElement.onclick = function() {
        checkTodoStatus(checkboxId, labelId, todoId);
    }

    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");

    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }

    labelElement.textContent = todo.text;
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container", "text-right");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    }

    deleteIconContainer.appendChild(deleteIcon);
}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}