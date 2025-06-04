class Controller {
    _registry;
    _view;
    constructor() {
        this._registry = new Registry();
        this._view = new View(() => this.onAddClick());
    }
    onAddClick() {
        console.log('onAddClick');
        const inputData = this._view.provideInputData();
        const addResult = this._registry.addRequest(inputData);
        if (addResult.success) {
            this._view.onAddEmployee(addResult);
        } else {
            this._view.onRejectEmployee(addResult);
        }
    }
}