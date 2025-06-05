class StatManager {
    _stats;
    constructor(stats) {
        this._stats = stats;
    }
    clearStats() {
        this._stats.innerHTML = '';
        // while (this._stats.firstElementChild) {
        //     this._stats.firstElementChild.remove();
        // }
    }
    updateStats({personCount, maxAge, minAge, averageAge, salary, avgSalary}) {
        this.clearStats();
        const minAgeStr = minAge? minAge.toString(): '';
        const maxAgeStr = maxAge ? maxAge.toString(): '';
        const personCountStr = personCount? personCount.toString(): '';
        const averageAgeStr = averageAge? averageAge.toFixed(2): '';
        const salStr = salary? salary.toString(): '';
        const avgSalStr = avgSalary? avgSalary.toFixed(2): '';
        return Builder.of(this._stats)
            .add(Builder.tag('p').text(`Minimal age: ${minAgeStr}`).build())
            .add(Builder.tag('p').text(`Maximal age: ${maxAgeStr}`).build())
            .add(Builder.tag('p').text(`Average age: ${averageAgeStr}`).build())
            .add(Builder.tag('p').text(`Total count: ${personCountStr}`).build())
            .add(Builder.tag('p').text(`Total salary: ${salStr}`).build())
            .add(Builder.tag('p').text(`Average salary: ${avgSalStr}`).build())
            .build();
    }
}