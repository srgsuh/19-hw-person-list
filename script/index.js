class View {
   // inputDocId;
   // inputFirstName;
   // inputLastName;
   // inputBirthDate;
   // inputSalary;
   _inputManager;

   btnAddEmployee;

   personList;
   //statistics;
   _stats;

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
      this._stats = new StatManager(document.getElementById("statistics"));
      this.btnAddEmployee = document.getElementById("person-add");
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
          .attr("title", "Remove employee")
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

   updateStatistics() {
      this._stats.updateStats(this.registry.getStatistics());
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