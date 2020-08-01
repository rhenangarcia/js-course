//Inserir item em lista
function liINTOul(ulElement, liText)
{
  ulElement.insertAdjacentHTML("beforeend", "<li>" + liText + "</li>");
}


//Exercício 01
const ulElement_ex01 = document.querySelector("#sec-ex01 ul");

function verificaMaioridade(idade)
{
  liINTOul(ulElement_ex01, "Iniciando verificaMaioridade() ...");
  
  //Promise é um objeto usado p/ processamento assíncrono, servindo
  //como proxy p/ um valor que não é necessariamente conhecido
  //quando a Promise é criada
  return new Promise
  (
    //Função executada pelo construtor da Promise, nomeando as funções desejadas
    //como argumentos, aguardando-as serem chamadas pela função principal executada
    //pela Promise, a fim de concluir o trabalho assíncrono por meio da definição
    //do estado da Promise
    function (res, rej)
    {
      liINTOul(ulElement_ex01, "Iniciando Promise() ...");
      liINTOul(ulElement_ex01, "Iniciando setTimeout() ...");

      //Inicia delay p/ demonstração da assincronicidade gerenciada pela Promise
      setTimeout
      (
        function ()
        {
          liINTOul(ulElement_ex01, "setTimeout() concluído!");
          
          //Define o estado da Promise a partir do retorno das funções nomeadas como
          //argumentos em caso de sucesso (res) ou falha (rej)
          return (idade > 18) ? res() : rej();
        },
        5000
      );
    }
  );
}

liINTOul(ulElement_ex01, "Executando verificaMaioridade(16) ...");
//Executa a função passando callbacks desejados aos métodos
verificaMaioridade(16)
  //Método chamado quando a Promise é resolvida
  .then
  (
    function ()
    {
      liINTOul(ulElement_ex01, "Promise() concluído!");
      liINTOul(ulElement_ex01, "verificaMaioridade() concluído!");
      liINTOul(ulElement_ex01, "Maior que 18 anos!");
    }
  )
  //Método chamado quando a Promise é rejeitada
  .catch
  (
    function ()
    {
      liINTOul(ulElement_ex01, "Promise() concluído!");
      liINTOul(ulElement_ex01, "verificaMaioridade() concluído!");
      liINTOul(ulElement_ex01, "Menor que 18 anos!");
    }
  );
liINTOul(ulElement_ex01, "Código síncrono finalizado!");


//Exercícios 02 e 03 (Sem axios)
const inputElement_ex02_03 = document.querySelector("#sec-ex02_03 input[name=user]");
const buttonElement_ex02_03 = document.querySelector("#sec-ex02_03 button");
const ulElement_ex02_03 = document.querySelector("#sec-ex02_03 ul");

function buscaRepositorio(ulElement_ex, usuario)
{
  //Cria e executa uma promise p/ requisição HTTP
  const XHRprom = new Promise
  (
    function (resolve, reject)
    {
      //Limpa lista
      ulElement_ex.innerHTML = "";
      liINTOul(ulElement_ex, "Buscando repositórios do usuário \"" + usuario + "\" ...");

      //Cria uma requisição HTTP p/ API de repositórios do GitHub
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "https://api.github.com/users/" + usuario + "/repos");
      xhr.send();

      //Aguarda requisição HTTP de forma assíncrona
      xhr.onreadystatechange = function ()
      {
        //Se requisição for concluída
        if (xhr.readyState === 4)
          //Se reposta obtida for bem sucedida (200)
          if (xhr.status === 200)
            resolve(xhr.responseText);
          else
            reject(xhr.status);
      }
    }
  );
  
  //Passa callbacks desejados aos métodos
  XHRprom
    //Método chamado quando a Promise é resolvida
    .then
    (
      //Função anônima capturando o argumento passado em resolve()
      function (xhrResponse)
      {
        //Transforma JSON em vetor
        const repos = JSON.parse(xhrResponse);
        
        if (!repos.length)
          liINTOul(ulElement_ex, "O usuário \"" + usuario + "\" não possui repositórios!");
        
        else
        {
          liINTOul(ulElement_ex, "O usuário \"" + usuario + "\" possui " + repos.length + " repositórios:");

          //Cria uma nova lista
          const ulElement = document.createElement("ul");
          ulElement_ex.appendChild(ulElement);

          for (const repo of repos)
          {
            liINTOul(ulElement, repo.name);
          }
        }
      }
    )
    //Método chamado quando a Promise é rejeitada
    .catch
    (
      //Função anônima capturando o argumento passado em reject()
      function (xhrError)
      {
        if (xhrError === 404)
          liINTOul(ulElement_ex, "O usuário \"" + usuario + "\" não foi encontrado!");
        else
          liINTOul(ulElement_ex, "Erro na requisição HTTP: " + XHRerror);
      }
    )
}

buttonElement_ex02_03.onclick = function ()
{
  buscaRepositorio(ulElement_ex02_03, inputElement_ex02_03.value);
  inputElement_ex02_03.value = "";
}


//Exercícios 02 e 03 (Com axios)
const inputElement_ex02_03_ax = document.querySelector("#sec-ex02_03-axios input[name=user-axios]");
const buttonElement_ex02_03_ax = document.querySelector("#sec-ex02_03-axios button");
const ulElement_ex02_03_ax = document.querySelector("#sec-ex02_03-axios ul");

function buscaRepositorioComAxios(ulElement_ex, usuario)
{
  //Limpa lista
  ulElement_ex.innerHTML = "";
  liINTOul(ulElement_ex, "Buscando repositórios do usuário \"" + usuario + "\" ...");

  //Biblioteca axios c/ objeto axios (Promise) p/ fazer requisições HTTP
  axios.get("https://api.github.com/users/" + usuario + "/repos")
    //Método chamado quando a Promise é resolvida
    .then
    (
      //Função anônima capturando o objeto passado em resolve()
      function (response)
      {
        //Armazena o vetor data do objeto response
        const repos = response.data;
        
        if (!repos.length)
          liINTOul(ulElement_ex, "O usuário \"" + usuario + "\" não possui repositórios!");
        
        else
        {
          liINTOul(ulElement_ex, "O usuário \"" + usuario + "\" possui " + repos.length + " repositórios:");

          //Cria uma nova lista
          const ulElement = document.createElement("ul");
          ulElement_ex.appendChild(ulElement);

          for (const repo of repos)
          {
            liINTOul(ulElement, repo.name);
          }
        }
      }
    )
    //Método chamado quando a Promise é rejeitada
    .catch
    (
      //Função anônima capturando o objeto passado em reject()
      function (error)
      {
        if (error.request.status === 404)
          liINTOul(ulElement_ex, "O usuário \"" + usuario + "\" não foi encontrado!");
        else
          liINTOul(ulElement_ex, "Erro na requisição HTTP: " + error);
      }
    )
}

buttonElement_ex02_03_ax.onclick = function ()
{
  buscaRepositorioComAxios(ulElement_ex02_03_ax, inputElement_ex02_03_ax.value);
  inputElement_ex02_03_ax.value = "";
}