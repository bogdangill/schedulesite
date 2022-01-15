import Tag from '../../../../renderers/Tag';
import Icon from '../../../../renderers/Icon';

import iconProgress from '../../../../icons/state-progress.svg';
import iconBurger from '../../../../icons/burger.svg';

import './task.css';

class Task {
    constructor(parentSelector, text) {
        this.parentSelector = parentSelector;
        this.text = text;
    }

    elements = {
        wrapper: {
            parentSelector: '.tasks-list',
            tagName: 'li',
            className: 'task'
        },
        sidebar: {
            parentSelector: '.task',
            tagName: 'div',
            className: 'task__sidebar'
        },
        state: {
            parentSelector: '.task__sidebar',
            tagName: 'div',
            className: 'task__state'
        },
        text: {
            parentSelector: '.task',
            tagName: 'p',
            className: 'task__text'
        },
        options: {
            parentSelector: '.task',
            tagName: 'div',
            className: 'task__options'
        }
    }

    icons = {
        progress: {
            parentSelector: '.task__state',
            iconId: iconProgress.id,
            iconViewBox: iconProgress.viewBox
        },
        menu: {
            parentSelector: '.task__options',
            iconId: iconBurger.id,
            iconViewBox: iconBurger.viewBox
        }
    }

    _renderElements() {
        for (let element in this.elements) { 
            const { parentSelector, tagName, className, textContent } = this.elements[element];

            let el = new Tag(parentSelector, tagName, className, textContent);
            if (element == 'wrapper') el.parentSelector = this.parentSelector;
            if (element == 'text') el.textContent = this.text;

            el.render();
        }
    }

    _renderIcons() {
        for (let icon in this.icons) {
            const { parentSelector, iconId, iconViewBox } = this.icons[icon];
            
            const parent = document.querySelector(parentSelector);
            const i = new Icon(iconId, iconViewBox);
            parent.insertAdjacentHTML('afterbegin', i.render());
        }
    }

    render() {
        this._renderElements();
        this._renderIcons();
    }
}

export default Task