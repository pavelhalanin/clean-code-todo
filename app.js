const NEW_TASK_INPUT = document.getElementById("new-task");
const NEW_TASK_BUTTON = document.getElementById("new-task-button");
const UNCOMPLETED_TASKS_ARRAY = document.getElementById("incompleteTasks");
const COMPLETED_TASKS_ARRAY = document.getElementById("completed-tasks");

const createNewTaskElement = function (taskString) {
  const LIST_NODE = document.createElement("li");
  const CHECK_BOX = document.createElement("input");
  const LABEL = document.createElement("label");
  const EDIT_INPUT = document.createElement("input");
  const EDIT_BUTTON = document.createElement("button");
  const DELETE_BUTTON = document.createElement("button");
  const DELETE_BUTTON_IMG = document.createElement("img");

  LABEL.innerText = taskString;
  LABEL.className = "task";

  CHECK_BOX.type = "checkbox";
  EDIT_INPUT.type = "text";
  EDIT_INPUT.className = "task";

  EDIT_BUTTON.innerText = "Edit";
  EDIT_BUTTON.className = "edit";

  DELETE_BUTTON.className = "delete";
  DELETE_BUTTON_IMG.src = "./remove.svg";
  DELETE_BUTTON.appendChild(DELETE_BUTTON_IMG);

  LIST_NODE.appendChild(CHECK_BOX);
  LIST_NODE.appendChild(LABEL);
  LIST_NODE.appendChild(EDIT_INPUT);
  LIST_NODE.appendChild(EDIT_BUTTON);
  LIST_NODE.appendChild(DELETE_BUTTON);
  return LIST_NODE;
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
  const LIST_NODE = this.parentNode;

  const EDIT_INPUT = LIST_NODE.querySelector("input[type=text]");
  const LABEL = LIST_NODE.querySelector("label");
  const EDIT_BUTTON = LIST_NODE.querySelector(".edit");
  const IS_EDIT_FORM_MODE = LIST_NODE.classList.contains("editMode");

  LIST_NODE.classList.toggle("editMode");

  if (IS_EDIT_FORM_MODE) {
    LABEL.innerText = EDIT_INPUT.value;
    EDIT_BUTTON.innerText = "Edit";
    return;
  }

  EDIT_INPUT.value = LABEL.innerText;
  EDIT_BUTTON.innerText = "Save";
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;

  ul.removeChild(listItem);
};

NEW_TASK_BUTTON.addEventListener("click", addTask);

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
