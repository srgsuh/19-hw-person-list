class View {
    _inputManager;
    _statManager;
    _listManager;
    _onDeleteClick;
    _btnAddEmployee;

    constructor(onAddClick, onDeleteClick) {
        this._btnAddEmployee = document.getElementById("person-add");
        this._inputManager = new InputManager(
            document.getElementById("doc-id"),
            document.getElementById("first-name"),
            document.getElementById("last-name"),
            document.getElementById("birth-date"),
            document.getElementById("salary"),
        );
        this._statManager = new StatManager(document.getElementById("statistics"));
        this._listManager = new ListManager(document.getElementById("person-list"));
        this._onDeleteClick = onDeleteClick;
        this._onAddClick = onAddClick;
    }

    setListeners() {
        this._btnAddEmployee.addEventListener("click", this._onAddClick);
        document.addEventListener("keydown", (e) => {this.onEnterPress(e)});
    }

    onEnterPress(event) {
        if (event.key === 'Enter' && this._inputManager.confirmEnter(event.target)) {
            this._onAddClick();
        }
    }

    clearInputs() {
        this._inputManager.clear();
    }

    setInputs(...args) {
        console.log('view.setInputs', args);
        this._inputManager.setInputs(...args);
    }

    provideInputData() {
        return this._inputManager.getInputData();
    }

    onAddSuccess({itemId, itemText}) {
        this._listManager.add(itemId, itemText, () => this._onDeleteClick(itemId));
        this.clearInputs();
        this._inputManager.catchFocus();
        return true;
    }

    onAddReject({errors}) {
        alert(`Errors: \n${errors.join('\n')}`);
        return true;
    }

    onDeleteSuccess(itemId) {
        return this._listManager.remove(itemId);
    }

    onDeleteReject(itemId) {
        console.error(`Employee with ID ${itemId} not found???`);
        return true;
    }

    updateStatistics(statObject) {
        this._statManager.updateStats(statObject);
    }
}