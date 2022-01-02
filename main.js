// selectors
const addInput = document.querySelector(".form__input");
const tasksList = document.querySelector(".todolist");
const select = document.querySelector(".form__select");
const form = document.querySelector(".form");

//todos array
const todoList = [];

//functions
const addTask = (e) => {
  e.preventDefault();

  if (addInput.value === "") {
    return null;
  }

  const newTask = document.createElement("li");
  newTask.innerHTML = `${addInput.value}
    <span><button class="todolist__done-btn">Done</button> <button class="todolist__del-btn">X</button></span>`;
  newTask.className = "todolist__task";
  todoList.push(newTask);
  addInput.value = "";
  
  render(select);

  newTask
    .querySelector(".todolist__del-btn")
    .addEventListener("click", removeTask);
  newTask
    .querySelector(".todolist__done-btn")
    .addEventListener("click", setState);
};

const removeTask = (e) => {
  const elForAnimation = e.target.closest(".todolist__task");
  elForAnimation.classList.add("fall");

  const index = e.target.closest(".todolist__task").dataset.key;
  todoList.splice(index, 1);

  elForAnimation.addEventListener("transitionend", () => render(select));
};

const setState = (e) => {
  const task = e.target.closest(".todolist__task");
  task.classList.toggle("deactive");
};

const render = (select) => {
  if (select.value === "completed") {
    tasksList.textContent = "";
    todoList.forEach((task, key) => {
      task.dataset.key = key;
      if (task.className === "todolist__task deactive") {
        tasksList.append(task);
      }
    });
  } else if (select.value === "uncompleted") {
    tasksList.textContent = "";
    todoList.forEach((task, key) => {
      task.dataset.key = key;
      if (task.className == "todolist__task") {
        tasksList.append(task);
      }
    });
  } else {
    tasksList.textContent = "";
    todoList.forEach((task, key) => {
      task.dataset.key = key;
      tasksList.append(task);
    });
  }
};

//event
form.addEventListener("submit", addTask);
select.addEventListener("change", () => render(select));
