class Builder {
    _element;
    constructor(element) {
        this._element = element;
    }
    add(otherElement) {
        this._element.appendChild(otherElement);
        return this;
    }
    text(strData) {
        this._element.append(document.createTextNode(strData));
        return this;
    }
    handle(eventName, eventHandler) {
        this._element.addEventListener(eventName, eventHandler);
        return this;
    }
    attr(attrName, attrValue) {
        this._element.setAttribute(attrName, attrValue);
        return this;
    }
    classes(...classes) {
        this._element.classList.add(...classes);
        return this;
    }
    build() {
        return this._element;
    }
    static of(element) {
        return new Builder(element);
    }
    static tag(elementTag) {
        return new Builder(document.createElement(elementTag));
    }
}