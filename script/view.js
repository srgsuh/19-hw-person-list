class View {
    _inputManager;
    _stats;

    btnAddEmployee;
    personList;

    registry;
    _actionManager;

    constructor(onAddClick, onDeleteClick) {
        this.registry = new Registry();
        this._inputManager = new InputManager(
            document.getElementById("doc-id"),
            document.getElementById("first-name"),
            document.getElementById("last-name"),
            document.getElementById("birth-date"),
            document.getElementById("salary"),
        );
        this._actionManager = new ActionManager();
        this._stats = new StatManager(document.getElementById("statistics"));
        this.btnAddEmployee = document.getElementById("person-add");
        this.personList = document.getElementById("person-list");
        this._setListeners(onAddClick);
        this._onDeleteClick = onDeleteClick;
        this.updateStatistics();
    }

    setAction(actionId, callback, ...params) {
        this._actionManager.addAction(actionId, callback, ...params);
    }
    executeAction(actionId) {
        this._actionManager.executeAction(actionId);
    }
    removeAction(actionId) {
        this._actionManager.removeAction(actionId);
    }

    _setListeners(onAddClick) {
        this.btnAddEmployee.addEventListener("click", onAddClick);
        document.addEventListener("keydown", (event) => {
            if (event.key === 'Enter' && this._inputManager.confirmEnter(event.target)) {
                onAddClick();
            }
        })
    }

    clearInputs() {
        this._inputManager.clear();
    }

    provideInputData() {
        return this._inputManager.getInputData();
    }

    createButton(text, onClick) {
        return Builder.tag("button")
            .text(text)
            .handle("click", onClick)
            .attr("title", "Remove employee")
            .build();
    }

    onAddEmployee({employee}) {
        const li = Builder.tag('li').build();
        const div = Builder.tag('div')
            .add(Builder.tag('span').text(employee.printText).build())
            .classes('person-item')
            .build();
        div.appendChild(
            this.createButton("\u274C",
                ()=> {
                    this._onDeleteClick(new DeleteRequest(employee.docId, li))
                }
            )
        );
        this.personList.appendChild(Builder.of(li).add(div).build());
        this.updateStatistics();
        this.clearInputs();
        this._inputManager.catchFocus();
    }

    onRejectEmployee({errors}) {
        alert(`Errors: \n${errors.join('\n')}`);
    }

    deleteEmployee(employee, callback) {
        if (this.registry.remove(employee)) {
            if (callback && typeof callback === 'function') {
                callback();
            }
            this.updateStatistics();
        }
    }

    updateStatistics() {
        this._stats.updateStats(this.registry.getStatistics());
    }
}