/**
 * Represents the result of a validation check, containing validation status and any errors.
 */
class CheckResult {
    /** @type {boolean} Indicates if the check is valid */
    valid;
    /** @type {string[]} Array of validation error messages */
    errors;

    /**
     * Creates a new CheckResult instance
     * @param {boolean} valid - The validation status
     * @param {string[]} errors - Array of validation error messages
     */
    constructor(valid, errors) {
        this.valid = valid;
        this.errors = errors;
    }

    combine(other) {
        if (this.valid && other.valid) {
            return CheckResult.VALID_RESULT;
        }
        return new CheckResult(false, this.errors.concat(other.errors));
    }

    /** @type {CheckResult} A predefined valid result with no errors */
    static VALID_RESULT = new CheckResult(true, []);
}

class Statistics {
    /** @type {number} The number of people in the database */
    personCount;
    /** @type {number} The maximum age among all people */
    maxAge;
    /** @type {number} The minimum age among all people */
    minAge;
    /** @type {number} The average age of all people */
    averageAge;

    /**
     * Creates a new Statistics instance
     * @param {number} personCount - The total number of people
     * @param {number} maxAge - The maximum age
     * @param {number} minAge - The minimum age
     * @param {number} averageAge - The average age
     */
    constructor(personCount, maxAge, minAge, averageAge) {
        this.personCount = personCount;
        this.maxAge = maxAge;
        this.minAge = minAge;
        this.averageAge = averageAge;
    }
    static EMPTY = new Statistics(0, 0, 0, 0);
}