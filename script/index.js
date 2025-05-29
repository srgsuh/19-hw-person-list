class View {
   inputDocId;
   inputFirstName;
   inputLastName;
   inputBirthDate;
   btnAddPerson;

   personList;
   statistics;

   registry;

   constructor() {
      this.registry = new Registry();
      this.inputDocId = document.getElementById("doc-id");
      this.inputFirstName = document.getElementById("first-name");
      this.inputLastName = document.getElementById("last-name");
      this.inputBirthDate = document.getElementById("birth-date");
      this.btnAddPerson = document.getElementById("person-add");
      this.statistics = document.getElementById("statistics");
      this.personList = document.getElementById("person-list");
      this.setListeners();
      this.updateStatistics();
   }

   setListeners() {
      this.btnAddPerson.addEventListener("click", this.addOnClick.bind(this));
      document.addEventListener("keydown", (event) => {
         if (event.key === 'Enter' && event.target === this.inputBirthDate) {
            this.addOnClick();
         }
      })
   }

   clearInputs() {
      this.inputDocId.value = '';
      this.inputFirstName.value = '';
      this.inputLastName.value = '';
      this.inputBirthDate.value = '';
   }

   addOnClick() {
      const person = new Person(
          this.inputDocId.value,
          this.inputFirstName.value,
          this.inputLastName.value,
          this.inputBirthDate.value
      );
      const addResult = this.registry.add(person);
      if (addResult.success) {
         this.addPerson(addResult.person);
      }
      else {
         alert(`Errors: \n${addResult.errors.join('\n')}`);
      }
   }

   createButton(text, onClick, ...classes) {
      return Builder.tag("button")
          .text(text)
          .handle("click", onClick)
          .attr("title", "Delete from list")
          .classes(...classes)
          .build();
   }

   addPerson(person) {
      const li = Builder.tag('li').build();
      const div = Builder.tag('div')
          .add(Builder.tag('span').text(person.printText).build())
          .classes('person-item')
          .build();
      div.appendChild(
          this.createButton("\u274C", ()=>this.deletePerson(person, () => li.remove()))
      );
      this.personList.appendChild(Builder.of(li).add(div).build());
      this.updateStatistics();
      this.clearInputs();
      this.inputDocId.focus();
   }

   deletePerson(person, callback) {
      if (this.registry.remove(person)) {
         if (callback && typeof callback === 'function') {
            callback();
         }
         return true;
      }
      this.updateStatistics();
   }
   clearStatistics() {
      while (this.statistics.firstElementChild) {
         this.statistics.firstElementChild.remove();
      }
   }
   updateStatistics() {
      this.clearStatistics();
      const {personCount, maxAge, minAge, averageAge} = this.registry.getStatistics();
      const minAgeStr = minAge? minAge.toString(): '';
      const maxAgeStr = maxAge ? maxAge.toString(): '';
      const averageAgeStr = averageAge? averageAge.toFixed(2): '';
      return Builder.of(this.statistics)
          .add(Builder.tag('p').text(`Min age: ${minAgeStr}`).build())
          .add(Builder.tag('p').text(`Max age: ${maxAgeStr}`).build())
          .add(Builder.tag('p').text(`Average: ${averageAgeStr}`).build())
          .add(Builder.tag('p').text(`Total count: ${personCount}`).build())
          .build();
   }
}

const mockData = [
   ['11111111', 'Deep', 'Purple', '1965-01-01'],
   ['22222222', 'Uriah', 'Heep', '1969-08-03'],
   ['33333333', 'Pink', 'Floyd', '1964-01-05'],
   ['44444444', 'Green', 'Day', '1988-02-29'],
];
function addMockData(view) {
   mockData.forEach(dataArr => {
      [view.inputDocId.value,
      view.inputFirstName.value,
      view.inputLastName.value,
      view.inputBirthDate.value] = dataArr;
      view.addOnClick();
   })
}

document.addEventListener('DOMContentLoaded', () => {
   const view = new View();
   // addMockData(view);
});