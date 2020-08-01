const listElement = document.querySelector("#task-app ul");
const inputElement = document.querySelector("#task-app input");
const buttonElement = document.querySelector("#task-app button");

//Carrega o vetor "tasks" do Local Storage e converte-o em array,
//se não houver "task_list", cria um vetor vazio
let tasks = JSON.parse(localStorage.getItem("task_list")) || [];

function renderTasks()
{
  //Limpa task conteúdo da lista
  listElement.innerHTML = "";

  for (const task of tasks)
  {
    //Cria item da lista c/ texto "task"
    const itemElement = document.createElement("li");
    const itemTextElement = document.createTextNode(task + " ");
    itemElement.appendChild(itemTextElement);

    //Determina a posição do item no vetor "tasks"
    const taskPos = tasks.indexOf(task);

    //Adiciona link "X" ao item da lista
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", "#");
    linkElement.setAttribute("onclick", "deleteTask(" + taskPos + ")");
    const linkTextElement = document.createTextNode("X");
    linkElement.appendChild(linkTextElement);
    itemElement.appendChild(linkElement);

    //Adiciona item a lista
    listElement.appendChild(itemElement);
  }
}

function saveToLocalStorage()
{
  //Salva o vetor "tasks" em formato JSON no Local Storage
  localStorage.setItem("task_list", JSON.stringify(tasks));
}

function addTask()
{
  //Adiciona conteúdo da caixa input ao vetor "tasks"
  if (inputElement.value)
  {
    tasks.push(inputElement.value);
    inputElement.value = "";
    saveToLocalStorage();
    renderTasks();
  }
}

function deleteTask(taskPos)
{
  //Deleta um item do vetor de acordo c/ índice inicial desejado
  tasks.splice(taskPos, 1);
  saveToLocalStorage();
  renderTasks();
}

buttonElement.onclick = addTask;
renderTasks();