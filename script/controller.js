class Controller {
    _registry;
    _view;
    constructor() {
        this._registry = new Registry();
        this._view = new View(() => this.onAddClick(), (itemId) => this.onDeleteClick(itemId));
    }
    initApp() {
        this._view.setListeners();
        this.updateStatistics();
    }
    onAddClick() {
        const inputData = this._view.provideInputData();
        const addResult = this._registry.add(new Employee(...inputData));
        if (addResult.success) {
            this._view.onAddSuccess(addResult);
            this.updateStatistics();
        } else {
            this._view.onAddReject(addResult);
        }
    }
    onDeleteClick(itemId) {
        if (this._registry.remove(itemId)) {
            this._view.onDeleteSuccess(itemId);
            this.updateStatistics();
        } else {
            this._view.onDeleteReject(itemId);
        }
    }
    updateStatistics() {
        this._view.updateStatistics(this._registry.getStatistics());
    }
    addMock(...args) {
        this._view.setInputs(...args);
        this.onAddClick();
    }
}