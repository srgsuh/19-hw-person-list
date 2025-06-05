class Employee extends Person {
    _salary;
    static MIN_SALARY = 1000;
    constructor(docId, firstName, lastName, birthDate, salary) {
        super(docId, firstName, lastName, birthDate);
        this._salary = +salary;
    }
    get salary() {
        return this._salary;
    }
    toString() {
        return `${super.toString()}, salary ${this.salary}`;
    }
    validate() {
        return super.validate().combine(this.validateEmployee());
    }
    validateEmployee() {
        const errors = [];
        if (!this._salary) {
            errors.push("Salary is required");
        }
        else {
            if (isNaN(this._salary)) {
                errors.push("Salary must be a number");
            }
            if (this._salary < Employee.MIN_SALARY) {
                errors.push(`Salary must be at least ${Employee.MIN_SALARY}`);
            }
        }
        return errors.length === 0? CheckResult.VALID_RESULT: new CheckResult(false, errors);
    }
}