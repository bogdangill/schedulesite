import './button.css';

class Button {
    constructor(data) {
        this.parentSelector = data.parentSelector;
        this.modifier = data.modifier;
        this.text = data.text;
        this.iconViewBox = data.iconViewBox;
        this.iconId = data.iconId;
        this.description = data.description;
    }

    _checkChildren() {
        const children = {
            icon: ``,
            description: ``,
            text: `` 
        };

        if (this.iconId && this.iconViewBox) {
            children.icon = `
                <svg viewBox="${this.iconViewBox}">
                    <use xlink:href="#${this.iconId}"></use>
                </svg>
            `;
        }

        if (this.description) {
            children.description = `
                <span class="sr-only">${this.description}</span>
            `;
        }

        if (this.text) {
            children.text = `<span>${this.text}</span>`;
        }

        return children
    }

    insert() {
        const { icon, description, text } = this._checkChildren();

        let markup = `
            <button class="btn ${this.modifier}" type="button">
               `+icon + description + text +`
            </button>
        `;

        return markup
    }

    render() {
        let parent = document.querySelector(this.parentSelector);
        const { icon, description, text } = this._checkChildren();

        return parent.insertAdjacentHTML('beforeend', `
            <button class="btn ${this.modifier}" type="button">
                `+icon + description + text +`
            </button>
        `)
    }
}

export default Button