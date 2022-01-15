class Tag {
    constructor(parentSelector, tagName, className, textContent) {
        this.parentSelector = parentSelector;
        this.tagName = tagName;
        this.className = className;
        this.textContent = textContent;
    }

    _create() {
        const tag = document.createElement(this.tagName);
        if (this.className) tag.classList.add(this.className);
        if (this.textContent) tag.textContent = this.textContent;
        return tag
    }

    render() {
        const parent = document.querySelector(this.parentSelector);
        return parent.appendChild(this._create());
    }
}

export default Tag