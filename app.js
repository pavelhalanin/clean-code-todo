const NEW_TASK_INPUT = document.getElementById("new-task");
const addButton = document.getElementsByTagName("button")[0];
const UNCOMPLETED_TASKS_ARRAY = document.getElementById("incompleteTasks");
const COMPLETED_TASKS_ARRAY = document.getElementById("completed-tasks");

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement("li");

  const checkBox = document.createElement("input");

  const label = document.createElement("label");

  const editInput = document.createElement("input");

  const editButton = document.createElement("button");

  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");

  label.innerText = taskString;
  label.className = "task";

  checkBox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "task";

  editButton.innerText = "Edit";
  editButton.className = "edit";

  deleteButton.className = "delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  if (!NEW_TASK_INPUT.value) {
    return;
  }

  const TASK_LIST_ITEM = createNewTaskElement(NEW_TASK_INPUT.value);

  UNCOMPLETED_TASKS_ARRAY.appendChild(TASK_LIST_ITEM);
  setEventsForTask(TASK_LIST_ITEM);

  NEW_TASK_INPUT.value = "";
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editBtn = listItem.querySelector(".edit");
  const containsClass = listItem.classList.contains("editMode");

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("editMode");
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;

  ul.removeChild(listItem);
};

addButton.addEventListener("click", addTask);

const setEventsForTask = function (taskListItem) {
  taskListItem.querySelector("input[type=checkbox]").onchange = moveTask;
  taskListItem.querySelector("button.edit").onclick = editTask;
  taskListItem.querySelector("button.delete").onclick = deleteTask;
};

const moveTask = function () {
  const TASK_LIST_ELEMENT = this.parentNode;
  const ARRAY = this.checked ? COMPLETED_TASKS_ARRAY : UNCOMPLETED_TASKS_ARRAY;
  ARRAY.appendChild(TASK_LIST_ELEMENT);
};

UNCOMPLETED_TASKS_ARRAY.querySelectorAll("li").forEach((li) =>
  setEventsForTask(li)
);

COMPLETED_TASKS_ARRAY.querySelectorAll("li").forEach((li) =>
  setEventsForTask(li)
);
