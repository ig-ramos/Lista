const formulario = document.querySelector('#form');
const tarefaInput = formulario.querySelector('#tarefa');
const btnAdd = formulario.querySelector('#btnAdd');
const listaTarfas = formulario.querySelector('#itens');

btnAdd.addEventListener('click', (e) => {
    e.preventDefault();
    if(!tarefaInput.value){
        return;
    }
    if(e.keyCode === 13){
        criarTarefa(tarefaInput.value);
    }

    criarTarefa(tarefaInput.value);
})

document.addEventListener('click', (e) => {
    const elemento = e.target;
    if(elemento.classList.contains('btnApagar')){
        elemento.parentElement.remove();
        dbTarefas();
    }
})

function criarTarefa(tarefa){
    const item = criaItem();
    item.innerText = tarefa;
    listaTarfas.appendChild(item);
    limparInput();
    criaChek(item)
    criaBtnApagar(item);
    dbTarefas();
}

function criaItem(){
    const item = document.createElement('li');
    item.setAttribute('class', 'itemTarefa');
    return item;
}

function criaBtnApagar(item){
    const btnApagar = document.createElement('button');
    btnApagar.innerText += 'APAGAR TAREFA';
    btnApagar.setAttribute('class', 'btnApagar')
    item.appendChild(btnApagar);
}

function criaChek(item){
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.setAttribute('class', 'check')
    item.appendChild(checkBox);

    checkBox.addEventListener('change', () => {
        if(!item.classList.contains('feito')){
            item.setAttribute('class', 'feito');
        }else{
            item.classList.remove('feito')
        }
    })
}

function limparInput(){
    tarefaInput.value = '';
    tarefaInput.focus();
}

function dbTarefas(){
    const listaTarefas = formulario.querySelectorAll('li');
    const tarefasSalvas = [];
    
    for(tarefas of listaTarefas){
        let tarefaTexto = tarefas.innerText;
        tarefaTexto = tarefaTexto.replace('APAGAR TAREFA', '').trim();
        tarefasSalvas.push(tarefaTexto)
    }

    const dbJSON = JSON.stringify(tarefasSalvas);
    localStorage.setItem('tarefas', dbJSON);
}

function addTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const tarefasFormatadas = JSON.parse(tarefas);
    for(let t of tarefasFormatadas){
        criarTarefa(t);
    }
}

addTarefasSalvas();