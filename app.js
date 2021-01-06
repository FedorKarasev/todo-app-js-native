// Select elements
const clear = document.querySelector('.clear');
const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');

// Variables
let LIST, id;

// Classes names
const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle-thin';
const LINE_THROUGH = 'lineThrough';

// Get item from localstorage
let data = localStorage.getItem('TODO')

if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
} else {
    LIST = [];
    id = 0;
}

// Show todays date
dateElement.innerHTML = new Date().toLocaleDateString('ru-RU', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
});

// ad to do function

function addToDo(toDo, id, done, trash = false) {

    if (trash) return;

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : '';

    const item = `
    <li class="item">
        <i class="fa co ${DONE}" data-job="complete" id="${id}"></i>
        <p class="text ${LINE}">${toDo}</p>
        <i class="fa fa-trash-o de" data-job="delete" id="${id}"></i>
    </li>
    `;

    list.insertAdjacentHTML('beforeend', item);
}

// add event listeners
document.addEventListener('keyup', (event) => {
    if (event.key == 'Enter' && input.value) {
        addToDo(input.value, id, false, false);
        LIST.push({
            name: input.value,
            id: id,
            done: false,
            trash: false
        });
        localStorage.setItem('TODO', JSON.stringify(LIST));
        id++;
        input.value = '';
    }
});

list.addEventListener('click', (event) => {
    const element = event.target;
    const elementJob = element.dataset.job;
    if (elementJob == 'complete') {
        completeToDo(element)
    } else if (elementJob == 'delete') {
        removeToDo(element);
    }

    localStorage.setItem('TODO', JSON.stringify(LIST));
});

clear.addEventListener('click', (event) => {
    localStorage.clear();
    location.reload();
});

// complete todo
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove todo
function removeToDo(element) {
    console.log(element);
    element.parentNode.remove();
    LIST[element.id].trash = true;
}

function loadList(list) {
    list.forEach(element => {
        addToDo(element.name, element.id, element.done, element.trash);
    });
}