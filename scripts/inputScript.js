//этот скрипт предназначен для создания ячейки с текстом, который вводится в textarea. я разработал его для
//работы своего планнера
//сначала я использовал изученный на htmlacademy алгоритм по реализации работы кнопки submitbutton
//потом я решил добавить сценарий-метод на весь документ с горячими клавишами(изучил на learnjavascript)
//когда у меня это получилось, то я решил упростить код и избавиться от копипасты основного алгоритма функции
//и изучил this(спасибо статье на хабре). даже конструкторы с классами оказались необязательны(которые я так
//до конца и не понял).
//(03/04/20) вонючий карантин, денег нет, никуда не выйти..

let planList = document.querySelector(".plan-list");
let plannerForm = document.querySelector(".planner-form");
let buttonSubmit = document.querySelector(".btn-submit");
let textArea = document.querySelector("textarea");

//сейчас я создаю функцию, которая делает блок с созданием и отправкой комментария/плана из поля для ввода
//она общая и не выполняется в сценарии скрипта(висит в памяти), пока ее не вызовут через ссылку this
//так я изучил на практике, что такое этот this и зачем он нужен
function Submitting() {
    let planListItem = document.createElement('li');
    planList.append(planListItem);
    planListItem.classList.add('plan-list-item');
    planListItem.textContent = textArea.value;
    textArea.value = '';
    let closeButton = document.createElement('button');
    planListItem.append(closeButton);
    closeButton.classList.add('close-button');
    closeButton.textContent = 'x';

    closeButton.onclick = function() {
        planList.removeChild(planListItem);
    }
};

document.addEventListener('keydown'/*при нажатии*/, function(event) { //добавляю сценарий-ивент на весь документ по нажатию комбинации ctrl + enter (p.s. metaKey - это клавиша windows или cmd у mac)
    if (event.code == 'Enter' && event.ctrlKey) {
        //сейчас будет ссылка на ту самую функцию. удобно, что ее можно вызывать хоть где и хоть сколько, не копируя и вставляя ее каждый раз
        this.submitting = Submitting();
    }
});

buttonSubmit.onclick = function(evt) {
    evt.preventDefault();//это нужно для того, чтобы при нажатии на кнопку, которая располагается в форме, текст в <textarea> не отправлялся куда-то там, а добавлялся в созданный li.
    this.submitting = Submitting();
};