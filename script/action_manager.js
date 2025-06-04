class ActionManager {
    _actions;
    _params;
    constructor() {
        this._actions = new Map();
        this._params = new Map();
    }
    addAction(actionId, callback, ...params) {
        this._actions.set(actionId, callback);
        this._params.set(actionId, params);
    }
    removeAction(actionId) {
        this._actions.delete(actionId);
        this._params.delete(actionId);
    }
    executeAction(actionId) {
        if (this._actions.has(actionId)) {
            const params = this._params.get(actionId) || [];
            this._actions.get(actionId)(...params);
            this.removeAction(actionId);
        }
    }
}