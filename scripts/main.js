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

function showInputDialog(message, textContainer) {
    let input = prompt(message);

    while (input === '' && input !== null) {
        alert(MESSAGE.errorEmpty);
        input = prompt(message);
    }

    if (textContainer !== undefined) {
        
        if ((input !== '') && (input !== null)) {
            textContainer.textContent = input;
        }
    } else {
        let content = input;
        return content;
    }
}

function addSubItem(parent) {
    let addBtn = parent.querySelector(".add-button");

    addBtn.addEventListener('click', () => {
        let subText = showInputDialog(MESSAGE.subItemHint);
        
        if (subText !== '' && subText !== null) {
            let subItemContainer = parent.querySelector(".sub-list");
            subItemContainer.removeAttribute('hidden');

            let newSubItem = createItem({
                template: subPlanTemplate,
                textContainerClass: "sub-item-content",
                text: subText,
                parent: subItemContainer,
            });
            deleteItem(newSubItem, '.sub-close-button');
            editItem(newSubItem, '.sub-edit-button', '.sub-item-content');
        }
    })
}

function deleteItem(parent, delBtnClass) {
    let delBtn = parent.querySelector(delBtnClass);

    delBtn.addEventListener('click', function () {
        parent.remove();
    });
}

function editItem(parent, editBtnClass, itemContentClass) {
    let editBtn = parent.querySelector(editBtnClass);
    let itemContent = parent.querySelector(itemContentClass);

    editBtn.addEventListener('click', () => {
        showInputDialog(MESSAGE.editHint, itemContent);
    })
}

function createItem(data) {
    let template = data.template;
    let templateInner = template.children[0];

    let item = templateInner.cloneNode(true);
    let itemText = item.querySelector("."+data.textContainerClass);
    itemText.textContent = data.text;

    let currentParent = data.parent;
    currentParent.appendChild(item);

    return item
}

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

    if (textArea.value !== '') {
        let newItem = createItem({
            template: planTemplate,
            textContainerClass: "item-content",
            text: textArea.value,
            parent: planList,
        });

        deleteItem(newItem, '.close-button');
        editItem(newItem, '.edit-button', '.item-content');
        addSubItem(newItem);

        textArea.value = '';
    } else {
        alert(MESSAGE.errorEmpty);
    }
})