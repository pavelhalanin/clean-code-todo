const NEW_TASK_INPUT = document.getElementById("new-task");
const NEW_TASK_BUTTON = document.getElementById("new-task-button");
const UNCOMPLETED_TASKS_ARRAY = document.getElementById("incompleteTasks");
const COMPLETED_TASKS_ARRAY = document.getElementById("completed-tasks");

class NewTaskElement {
  static create(taskTitle) {
    const TAG = document.createElement("li");
    TAG.appendChild(this.createCheckbox());
    TAG.appendChild(this.createLabel(taskTitle));
    TAG.appendChild(this.createEditInput());
    TAG.appendChild(this.createEditButton());
    TAG.appendChild(this.createDeleteButton());
    return TAG;
  }

  static createCheckbox() {
    const TAG = document.createElement("input");
    TAG.type = "checkbox";
    return TAG;
  }

  static createLabel(text) {
    const TAG = document.createElement("label");
    TAG.innerText = text;
    TAG.className = "task";
    return TAG;
  }

  static createEditInput() {
    const TAG = document.createElement("input");
    TAG.type = "text";
    TAG.className = "task";
    return TAG;
  }

  static createEditButton() {
    const TAG = document.createElement("button");
    TAG.innerText = "Edit";
    TAG.className = "edit";
    return TAG;
  }

  static createDeleteButton() {
    const TAG = document.createElement("button");
    TAG.className = "delete";
    TAG.appendChild(this.createDeleteButtonImage());
    return TAG;
  }

  static createDeleteButtonImage() {
    const TAG = document.createElement("img");
    TAG.src = "./remove.svg";
    return TAG;
  }
}

const addTask = function () {
  if (!NEW_TASK_INPUT.value) {
    return;
  }

  const TASK_LIST_ITEM = NewTaskElement.create(NEW_TASK_INPUT.value);

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
  const LIST_NODE = this.parentNode;
  const LIST = LIST_NODE.parentNode;
  LIST.removeChild(LIST_NODE);
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
