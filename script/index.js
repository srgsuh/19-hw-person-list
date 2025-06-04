class View {
   // inputDocId;
   // inputFirstName;
   // inputLastName;
   // inputBirthDate;
   // inputSalary;
   _inputManager;

   btnAddEmployee;

   personList;
   statistics;

   registry;

   constructor() {
      this.registry = new Registry();
      this._inputManager = new InputManager(
         document.getElementById("doc-id"),
         document.getElementById("first-name"),
         document.getElementById("last-name"),
         document.getElementById("birth-date"),
         document.getElementById("salary"),
      );
      this.btnAddEmployee = document.getElementById("person-add");
      this.statistics = document.getElementById("statistics");
      this.personList = document.getElementById("person-list");
      this.setListeners();
      this.updateStatistics();
   }

   setListeners() {
      this.btnAddEmployee.addEventListener("click", this.addOnClick.bind(this));
      document.addEventListener("keydown", (event) => {
         if (event.key === 'Enter' && this._inputManager.confirmEnter(event.target)) {
            this.addOnClick();
         }
      })
   }

   clearInputs() {
      this._inputManager.clear();
   }

   addOnClick() {
      try {
         this.btnAddEmployee.disabled = true;
         const formData = this._inputManager.getInputData();
         const employee = new Employee(formData.docId, formData.firstName, formData.lastName, formData.birthDate, formData.salary);
         const addResult = this.registry.add(employee);
         if (addResult.success) {
            this.addEmployee(addResult.person);
         } else {
            alert(`Errors: \n${addResult.errors.join('\n')}`);
         }
      }
      finally {
            this.btnAddEmployee.disabled = false;
      }
   }

   createButton(text, onClick) {
      return Builder.tag("button")
          .text(text)
          .handle("click", onClick)
          .attr("title", "Delete from list")
          .build();
   }

   addEmployee(employee) {
      const li = Builder.tag('li').build();
      const div = Builder.tag('div')
          .add(Builder.tag('span').text(employee.printText).build())
          .classes('person-item')
          .build();
      div.appendChild(
          this.createButton("\u274C", ()=>this.deleteEmployee(employee, () => li.remove()))
      );
      this.personList.appendChild(Builder.of(li).add(div).build());
      this.updateStatistics();
      this.clearInputs();
      this._inputManager.catchFocus();
   }

   deleteEmployee(employee, callback) {
      if (this.registry.remove(employee)) {
         if (callback && typeof callback === 'function') {
            callback();
         }
         this.updateStatistics();
      }
   }
   clearStatistics() {
      while (this.statistics.firstElementChild) {
         this.statistics.firstElementChild.remove();
      }
   }
   updateStatistics() {
      this.clearStatistics();
      const {personCount, maxAge, minAge, averageAge, salary, avgSalary} = this.registry.getStatistics();
      const minAgeStr = minAge? minAge.toString(): '';
      const maxAgeStr = maxAge ? maxAge.toString(): '';
      const averageAgeStr = averageAge? averageAge.toFixed(2): '';
      const salStr = salary? salary.toString(): '';
      const avgSalStr = avgSalary? avgSalary.toFixed(2): '';
      return Builder.of(this.statistics)
          .add(Builder.tag('p').text(`Minimal age: ${minAgeStr}`).build())
          .add(Builder.tag('p').text(`Maximal age: ${maxAgeStr}`).build())
          .add(Builder.tag('p').text(`Average age: ${averageAgeStr}`).build())
          .add(Builder.tag('p').text(`Total count: ${personCount}`).build())
          .add(Builder.tag('p').text(`Total salary: ${salStr}`).build())
          .add(Builder.tag('p').text(`Average salary: ${avgSalStr}`).build())
          .build();
   }
}

const mockData = [
   ['11111111', 'Deep', 'Purple', '1965-01-01', 10_300],
   ['22222222', 'Uriah', 'Heep', '1969-08-03', 4_500],
   ['33333333', 'Pink', 'Floyd', '1964-01-05', 19_800],
   ['44444444', 'Green', 'Day', '1988-02-29', 1_250],
];
function addMockData(view) {
   mockData.forEach(dataArr => {
      view._inputManager._setInputs(new RawInputData(...dataArr));
      view.addOnClick();
   });
}

document.addEventListener('DOMContentLoaded', () => {
   const view = new View();
   addMockData(view);
});