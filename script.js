const btnSend = document.querySelector(".btn_save");
const btnClose = document.querySelector(".btn-close");
const modal = document.querySelector(".wrapper__modal");
const btnEditTask = document.querySelector(".btnEdit");
const editName = document.querySelector(".edit-name");
const editDate = document.querySelector(".edit-date");
const editDescription = document.querySelector(".edit_decr");
const editType = document.querySelector('.select_modal')
const selectInputFilter= document.querySelector('.select_filter')
const ol = document.querySelector("ol");
const modalDone = document.querySelector(".wrapper__done");
let arrTasks = [];

btnSend.addEventListener("click", getValueForm);
btnClose.addEventListener("click", closeModal);
ol.addEventListener("click", getElementList);
btnEditTask.addEventListener("click", editTaskfinish);
selectInputFilter.addEventListener('change',filterTasks)

function getValueForm(event) {
  event.preventDefault();
  const form = document.querySelector(".formTask");
  const inputNameTask = document.querySelector(".name");
  const inputDedlineTask = document.querySelector(".date");
  const selectTypeTask = document.querySelector(".select_page");
  const textereaTask = document.querySelector(".txt-page");
  console.log(textereaTask.value);
  const id = arrTasks.length;
  const objForm = createObjectForm(
    inputNameTask.value,
    inputDedlineTask.value,
    selectTypeTask.value,
    textereaTask.value,
    id
  );

  arrTasks.push(objForm);
  createListTasks(arrTasks);
  form.reset();
  console.log(arrTasks);
  selectInputFilter.value = 'allTasks'
}

function createObjectForm(name, dedline, type, description, id) {
  return { name, dedline, type, description, id };
}

function createTask({ dedline, description, name, type }, id) {
  const li = document.createElement("li");
  li.id = id;
  const template = `
    <span>${name}</span>
    <span>${type}</span>
    <span>${dedline}</span>
    <span>${description}</span>
    <button class='btn_del-elements'>Del Elements</button>
    <button class= 'btn_open-modal'> open modal</buttom>
    `;
  li.innerHTML = template;
  return li;
  
}

function createListTasks(arr) {
  const ol = document.querySelector("ol");
  ol.innerHTML = "";
  arr.forEach((item, index) => {
    const resultli = createTask(item, index);
    ol.append(resultli);
  });
}

function openModal(id) {
  modal.classList.remove("none");
  console.log(arrTasks[id].name);
  editName.value = arrTasks[id].name;
  editDate.value = arrTasks[id].dedline;
  editDescription.innerHTML = arrTasks[id].description;
}

function closeModal(event) {
  event.preventDefault();
  modal.classList.add("none");
}

function getElementList(event) {
  const elemPage = event.target;
  const parent = elemPage.parentNode;
  const idPage = parent.id;
  if (elemPage.classList.contains("btn_open-modal")) {
    modal.id = idPage;
    openModal(idPage);
  }
  else if(elemPage.classList.contains("btn_del-elements")){
    delElements(idPage)
  }
}

function delElements(id){
  const newArrFilter = arrTasks.filter((object,index)=>{
    if(id == index){
      return false
    }
    return true
  })
  arrTasks = newArrFilter
  createListTasks(arrTasks)
}


function editTaskfinish(event) {
  event.preventDefault();
  const parent = event.target.parentNode.parentNode.parentNode;
  id = parent.id;
 arrTasks[id].dedline = editDate.value
 arrTasks[id].description = editDescription.value
 arrTasks[id].type = editType.value
 arrTasks[id].name = editName.value
 createListTasks(arrTasks)
 closeModal(event)
}

function filterTasks(event){
  const typeTask = event.target.value
  if(typeTask == 'allTasks') return createListTasks(arrTasks)
  const newFilterArrTasks = arrTasks.filter(item => item.type == typeTask)
  createListTasks(newFilterArrTasks)
}

