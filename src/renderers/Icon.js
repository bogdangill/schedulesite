class Icon {
    constructor(id, viewBox) {
        this.id = id;
        this.viewBox = viewBox;
    }

    render() {
        return `
        <svg viewBox="${this.viewBox}">
            <use xlink:href="#${this.id}"></use>
        </svg>`
    }
}

export default Icon