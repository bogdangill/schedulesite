// скрипт для создания ячеек плана и их редактирования(ввод и отправка текста в текстовом поле в ячейку плана, её удаление и редактирование)

let planList = document.querySelector(".plan-list");
let plannerForm = document.querySelector(".planner-form");
let textArea = document.querySelector(".main-textarea");
let contentArea = document.querySelector("main");
let planTemplate = document.querySelector("#plan-template").content;
let subPlanTemplate = document.querySelector("#subplan-template").content;

const MESSAGE = {
    errorEmpty: 'Пожалуйста, заполните поле ввода...',
    editHint: 'Редактируйте содержимое ячейки здесь: ',
    subItemHint: 'Введите содержимое подпункта: ',
    subItemEdit: 'Редактируйте содержимое подпункта здесь: ',
}

let i = 0; //   /____ каунтеры для условных сценариев
let x = 0; //   \

function deleteItem(parent) {
    let delBtn = parent.querySelector(".close-button");

    delBtn.addEventListener('click', function () {
        parent.remove();
    });
}

function editItem(parent) {
    let editBtn = parent.querySelector(".edit-button");
    let itemContent = parent.querySelector(".item-content");

    editBtn.addEventListener('click', () => {
        let text = prompt(MESSAGE.editHint);

        if ((text !== '') && (text !== null)) {
            itemContent.textContent = text;
        }

        while (text === '' && text !== null) {
            alert(MESSAGE.errorEmpty);
            text = prompt(MESSAGE.editHint);
        }
    })
}

function createItem(template, parent) {
    let templateInner = template.children[0];
    let item = templateInner.cloneNode(true);
    let itemText = item.querySelector(".item-content");
    itemText.textContent = textArea.value;
    parent.appendChild(item);

    deleteItem(item);
    editItem(item);
}

// function createAndEditItems() {

//     // let planListItem = document.createElement('li');
//     // planList.append(planListItem);
//     // planListItem.classList.add('plan-list-item');

//     // let itemContent = document.createElement('p');
//     // planListItem.append(itemContent);
//     // itemContent.classList.add('item-content');
//     // itemContent.textContent = textArea.value;
//     // textArea.value = '';

//     // let closeButton = document.createElement('button');
//     // planListItem.append(closeButton);
//     // closeButton.classList.add('close-button');
//     // closeButton.textContent = 'x';

//     // let editButton = document.createElement('button');//кнопка для изменения содержимого ячейки
//     // planListItem.append(editButton);
//     // editButton.classList.add('edit-button');

//     // let addButton = document.createElement('button');
//     // planListItem.append(addButton);
//     // addButton.classList.add('add-button');
//     // addButton.textContent = '+';

//     x++;
//     // console.log(x);

//     let subList = document.createElement('ul');

//     closeButton.onclick = function() {
//         planList.removeChild(planListItem);
//         x--;
//         // console.log(x);
//         if (x == 0) {
//             contentArea.classList.remove('index-main');
//         };
//     };

//     editButton.onclick = function() {
//         //события по клику для изменения текстового содержимого ячейки плана
//         //сделал через диалоговые окна браузера, мб потом прикручу это через отдельный сценарий с разметкой и стилями
//         let edited = prompt(MESSAGE.editHint);
//         if ((edited != '') && (edited != null)) {
//             itemContent.textContent = edited;
//         };
//         for (;((edited == '') && (edited != null));) {
//             alert(MESSAGE.errorEmpty);
//             edited = prompt(MESSAGE.editHint);
//             if ((edited != '') && (edited != null)) {
//                 itemContent.textContent = edited;
//             };
//         };
//     };

//     addButton.onclick = function() {
//         let addSub = prompt(MESSAGE.subItemHint);

//         for(;((addSub != null) && (addSub == ''));) {
//             alert(errorEmpty);
//             addSub = prompt(MESSAGE.subItemHint);
//             if ((addSub != null) && (addSub != '')) break;
//         };

//         if (addSub == null) return;

//         planListItem.append(subList);
//         subList.classList.add('sub-list');

//         let subItem = document.createElement('li');
//         subList.append(subItem);
//         subItem.classList.add('sub-item');

//         let itemContent = document.createElement('p');
//         subItem.append(itemContent);
//         itemContent.classList.add('sub-item-content');
//         itemContent.textContent = addSub;
//         i++;

//         let subClose = document.createElement('button');
//         subItem.append(subClose);
//         subClose.classList.add('sub-close-button');
//         subClose.textContent = 'x';

//         let subEdit = document.createElement('button');
//         subItem.append(subEdit);
//         subEdit.classList.add('sub-edit-button');

//         subEdit.onclick = function() {
//             let edited = prompt(MESSAGE.subItemEdit);
//             if ((edited != '') && (edited != null)) {
//                 itemContent.textContent = edited;
//             };
//             for (;((edited == '') && (edited != null));) {
//                 alert(MESSAGE.errorEmpty);
//                 edited = prompt(MESSAGE.subItemEdit);
//                 if ((edited != '') && (edited != null)) {
//                     itemContent.textContent = edited;
//                 };
//             };
//         };

//         subClose.onclick = function() {
//             subList.removeChild(subItem);
//             i--;
//             // console.log(i);
//             if (i == 0) {
//                 planListItem.removeChild(subList);
//             };
//         };
//     };
// };

document.addEventListener('keydown'/*при нажатии*/, function(event) { //добавляю сценарий-ивент на весь документ по нажатию комбинации ctrl + enter (p.s. metaKey - это клавиша windows или cmd у mac)
    if (event.code == 'Enter' && event.ctrlKey) {
        if (textArea.value != '') {
            createAndEditItems();
        }
        else {
            alert(MESSAGE.errorEmpty);
        };
    };
});

plannerForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    textArea.value !== '' ? createItem(planTemplate, planList) : alert(MESSAGE.errorEmpty);
})