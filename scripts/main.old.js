// скрипт для создания ячеек плана и их редактирования(ввод и отправка текста в текстовом поле в ячейку плана, её удаление и редактирование)

let planList = document.querySelector(".plan-list");
let plannerForm = document.querySelector(".planner-form");
let buttonSubmit = document.querySelector(".btn-submit");
let textArea = document.querySelector(".main-textarea");
let contentArea = document.querySelector("main")

let i = 0; //   /____ каунтеры для условных сценариев
let x = 0; //   \


//функция по активации поля ввода во время загрузки страницы. обработчик событий onload вставлен в разметку как
//аттрибут body

function initialFocus() {
    textArea.focus();
};

function additionalFocus() {
    textArea.focus();
};

function createAndEditItems() {
    contentArea.classList.add('index-main');

    let planListItem = document.createElement('li');
    planList.append(planListItem);
    planListItem.classList.add('plan-list-item');

    let itemContent = document.createElement('p');
    planListItem.append(itemContent);
    itemContent.classList.add('item-content');
    itemContent.textContent = textArea.value;
    textArea.value = '';

    let closeButton = document.createElement('button');
    planListItem.append(closeButton);
    closeButton.classList.add('close-button');
    closeButton.textContent = 'x';

    let editButton = document.createElement('button');//кнопка для изменения содержимого ячейки
    planListItem.append(editButton);
    editButton.classList.add('edit-button');

    let addButton = document.createElement('button');
    planListItem.append(addButton);
    addButton.classList.add('add-button');
    addButton.textContent = '+';

    x++;
    // console.log(x);

    let subList = document.createElement('ul');

    closeButton.onclick = function() {
        planList.removeChild(planListItem);
        x--;
        // console.log(x);
        if (x == 0) {
            contentArea.classList.remove('index-main');
        };
    };

    editButton.onclick = function() {
        //события по клику для изменения текстового содержимого ячейки плана
        //сделал через диалоговые окна браузера, мб потом прикручу это через отдельный сценарий с разметкой и стилями
        let edited = prompt('редактируй содержимое ячейки здесь: ');
        if ((edited != '') && (edited != null)) {
            itemContent.textContent = edited;
        };
        for (;((edited == '') && (edited != null));) {
            alert('нет, ну ты введи хоть что-то..');
            edited = prompt('редактируй содержимое ячейки здесь: ');
            if ((edited != '') && (edited != null)) {
                itemContent.textContent = edited;
            };
        };
    };

    addButton.onclick = function() {
        let addSub = prompt('введи содержание подпункта: ');

        for(;((addSub != null) && (addSub == ''));) {
            alert('Пожалуйста, заполни поле ввода, ячейка плана не может быть пустой..');
            addSub = prompt('введи содержание подпункта: ');
            if ((addSub != null) && (addSub != '')) break;
        };

        if (addSub == null) return;

        planListItem.append(subList);
        subList.classList.add('sub-list');

        let subItem = document.createElement('li');
        subList.append(subItem);
        subItem.classList.add('sub-item');

        let itemContent = document.createElement('p');
        subItem.append(itemContent);
        itemContent.classList.add('sub-item-content');
        itemContent.textContent = addSub;
        i++;

        let subClose = document.createElement('button');
        subItem.append(subClose);
        subClose.classList.add('sub-close-button');
        subClose.textContent = 'x';

        let subEdit = document.createElement('button');
        subItem.append(subEdit);
        subEdit.classList.add('sub-edit-button');

        subEdit.onclick = function() {
            let edited = prompt('редактируй содержимое подпункта здесь: ');
            if ((edited != '') && (edited != null)) {
                itemContent.textContent = edited;
            };
            for (;((edited == '') && (edited != null));) {
                alert('нет, ну ты введи хоть что-то..');
                edited = prompt('редактируй содержимое подпункта здесь: ');
                if ((edited != '') && (edited != null)) {
                    itemContent.textContent = edited;
                };
            };
        };

        subClose.onclick = function() {
            subList.removeChild(subItem);
            i--;
            // console.log(i);
            if (i == 0) {
                planListItem.removeChild(subList);
            };
        };
    };
};

document.addEventListener('keydown'/*при нажатии*/, function(event) { //добавляю сценарий-ивент на весь документ по нажатию комбинации ctrl + enter (p.s. metaKey - это клавиша windows или cmd у mac)
    if (event.code == 'Enter' && event.ctrlKey) {
        if (textArea.value != '') {
            createAndEditItems();
        }
        else {
            alert('Пожалуйста, заполни поле ввода, ячейка плана не может быть пустой..');
        };
    };
});

buttonSubmit.onclick = function(evt) {
    evt.preventDefault();//это нужно для того, чтобы при нажатии на кнопку, которая располагается в форме, текст в <textarea> не отправлялся куда-то там, а добавлялся в созданный li.
    if (textArea.value != '') {
        createAndEditItems();
    }
    else {
        alert('Пожалуйста, заполни поле ввода, ячейка плана не может быть пустой..');
    };
};