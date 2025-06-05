class ListManager {
    _list;
    _itemsById;
    constructor(listElement) {
        this._list = listElement;
        this._itemsById = new Map();
    }
    createButton(text, onClick) {
        return Builder.tag("button")
            .text(text)
            .handle("click", onClick)
            .attr("title", "Remove employee")
            .build();
    }
    add(itemId, itemText, onClick ) {
        const li = Builder.tag('li').build();
        this._itemsById.set(itemId, li);
        const div = Builder.tag('div')
            .add(Builder.tag('span').text(itemText).build())
            .classes('person-item')
            .build();
        div.appendChild(
            this.createButton("\u274C", onClick)
        );
        this._list.appendChild(Builder.of(li).add(div).build());
    }
    remove(itemId) {
        if (this._itemsById.has(itemId)) {
            this._list.removeChild(this._itemsById.get(itemId));
            this._itemsById.delete(itemId);
            return true;
        }
        return false;
    }
}