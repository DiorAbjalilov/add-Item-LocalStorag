let form = document.getElementById("addForm");
let itemList = document.getElementById("Items");
let filter = document.getElementById("filter");
let item = document.querySelectorAll(".list-group-item");
let int = document.getElementById("intItem");
let btn = document.querySelector("#btnClick");

document.addEventListener("DOMContentLoaded", getTodo);

// form submit event
form.addEventListener("submit", (e) => e.preventDefault());

btn.addEventListener("click", (e) => {
  // Createv element li
  let liItem = document.createElement("li");
  // Add class;
  liItem.className = "list-group-item";
  // Add text input value
  liItem.appendChild(document.createTextNode(int.value));
  itemList.appendChild(liItem);
  // save local storage
  saveLocal(int.value);
  // Createv del button
  let btnDel = document.createElement("button");
  btnDel.className = "btn btn-danger btn-sm float-end delete";
  // Add Appen text node
  btnDel.appendChild(document.createTextNode("X"));
  // Add li to button text
  liItem.appendChild(btnDel);
  int.value = "";
});

// delete submit event
itemList.addEventListener("click", (e) => {
  const item1 = e.target;
  if (e.target.classList.contains("delete")) {
    const todo = item1.parentElement;
    let li = e.target.parentElement;
    itemList.removeChild(li);
    removLocal(todo);
  }
});

// filter event
filter.addEventListener("keyup", (e) => {
  let text = e.target.value.toLowerCase();
  let items = itemList.getElementsByTagName("li");
  Array.from(items).forEach(function (item) {
    let itemName = item.firstChild.textContent;
    if (itemName.toLowerCase().indexOf(text) != -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});

function saveLocal(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodo() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    // Createv element li
    let liItem = document.createElement("li");

    // Add class;
    liItem.className = "list-group-item";

    // Add text input value
    liItem.appendChild(document.createTextNode(todo));
    itemList.appendChild(liItem);

    // Createv del button
    let btnDel = document.createElement("button");
    btnDel.className = "btn btn-danger btn-sm float-end delete";

    // Add Appen text node
    btnDel.appendChild(document.createTextNode("X"));

    // Add li to button text
    liItem.appendChild(btnDel);
    int.value = "";
  });
}

function removLocal(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// line function
itemList.addEventListener("click", (e) => {
  e.target.classList.toggle("line");
});
