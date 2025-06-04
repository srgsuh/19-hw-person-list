class Registry {
    _employees;
    constructor() {
        this._employees = new Map();
    }
    get size() {
        return this._employees.size;
    }
    isEmpty() {
        return this.size === 0;
    }
    hasId(id) {
        return this._employees.has(id);
    }
    remove({docId}) {
        if (this.hasId(docId)) {
            this._employees.delete(docId);
            return true;
        }
        return false;
    }
    validate(employee) {
        let checkResult = employee.validate();
        if (employee.docId && this.hasId(employee.docId)) {
            checkResult = checkResult.combine(
                new CheckResult(false, [`Employee with ID ${employee.docId} already exists`])
            );
        }
        return checkResult;
    }
    addRequest(inputData) {
        return this.add(new Employee(inputData.docId, inputData.firstName, inputData.lastName, inputData.birthDate, inputData.salary));
    }
    // add(
    //     docId,
    //     firstName,
    //     lastName,
    //     birthDate,
    //     salary
    //
    add(employee) {
        let validationResult = this.validate(employee);
        if (!validationResult.valid) {
            return new AddResult(false, employee, validationResult.errors);
        }
        this._employees.set(employee.docId, employee);
        return new AddResult(true, employee, []);
    }
    getStatistics() {
        if (this.isEmpty()) {
            return Statistics.EMPTY;
        }
        let min = Number.MAX_SAFE_INTEGER, max = -1, sum = 0;
        let salarySum = 0;
        for (const {age, salary} of this._employees.values()) {
            min = Math.min(min, age);
            max = Math.max(max, age);
            sum += age;
            salarySum += salary;
        }
        return new Statistics(this.size, max, min, sum/this.size, salarySum, salarySum/this.size);
    }
}