//этот скрипт предназначен для создания ячейки с текстом, который вводится в textarea. я разработал его для
//работы своего планнера
//сначала я использовал изученный на htmlacademy алгоритм по реализации работы кнопки submitbutton
//потом я решил добавить сценарий-метод на весь документ с горячими клавишами(изучил на learnjavascript)
//когда у меня это получилось, то я решил упростить код и избавиться от копипасты основного алгоритма функции
//(03/04/20) вонючий карантин, денег нет, никуда не выйти..

let planList = document.querySelector(".plan-list");
let plannerForm = document.querySelector(".planner-form");
let buttonSubmit = document.querySelector(".btn-submit");
let textArea = document.querySelector(".main-textarea");
let contentArea = document.querySelector("main");

let planListItem = document.createElement('li');
let itemContent = document.createElement('p');
let closeButton = document.createElement('button');
let editButton = document.createElement('button');//кнопка для изменения содержимого ячейки
let approveButton = document.createElement('button');

//функция по активации поля ввода во время загрузки страницы. обработчик событий onload вставлен в разметку как
//аттрибут body

function initialFocus() {
    textArea.focus();
};

function appendItems() {
    contentArea.classList.add('index-main');

    planList.append(planListItem);
    planListItem.classList.add('plan-list-item');

    planListItem.append(itemContent);
    itemContent.textContent = textArea.value;
    textArea.value = '';

    planListItem.append(closeButton);
    closeButton.classList.add('close-button');
    closeButton.textContent = 'x';

    planListItem.append(editButton);
    editButton.classList.add('edit-button');
};

document.addEventListener('keydown'/*при нажатии*/, function(event) { //добавляю сценарий-ивент на весь документ по нажатию комбинации ctrl + enter (p.s. metaKey - это клавиша windows или cmd у mac)
    if (event.code == 'Enter' && event.ctrlKey) {
        if (textArea.value != '') {
            appendItems();
        }
        else {
            alert('Пожалуйста, заполни поле ввода, ячейка плана не может быть пустой..');
        }
    }
});

buttonSubmit.onclick = function(evt) {
    evt.preventDefault();//это нужно для того, чтобы при нажатии на кнопку, которая располагается в форме, текст в <textarea> не отправлялся куда-то там, а добавлялся в созданный li.
    if (textArea.value != '') {
        appendItems();
    }
    else {
        alert('Пожалуйста, заполни поле ввода, ячейка плана не может быть пустой..');
    };
};

closeButton.onclick = function() {
    planList.removeChild(planListItem);
};

editButton.onclick = function() {
    //событие по клику для изменения текстового содержимого ячейки плана
    textArea.value = itemContent.textContent;//переношу туда текстовое содержимое
    textArea.focus();
    closeButton.disabled = true;
    // editButton.classList.toggle('hidden-element');
};