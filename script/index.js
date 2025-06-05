const mockData = [
   ['11111111', 'Deep', 'Purple', '1965-01-01', 10_300],
   ['22222222', 'Uriah', 'Heep', '1969-08-03', 4_500],
   ['33333333', 'Pink', 'Floyd', '1964-01-05', 19_800],
   ['44444444', 'Green', 'Day', '1988-02-29', 1_250],
];

document.addEventListener('DOMContentLoaded', () => {
   const controller = new Controller();
   controller.initApp();
   //mockData.forEach(arr => controller.addMock(...arr));
});