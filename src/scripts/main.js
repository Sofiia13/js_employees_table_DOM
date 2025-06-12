'use strict';

const head = document.querySelector('table thead');
const body = document.querySelector('table tbody');

let employeesArr = [];

const tr = body.querySelectorAll('tr');

// Sorting functionality
function extractEmployees() {
  employeesArr = [];

  tr.forEach((row) => {
    const cells = row.querySelectorAll('td');

    employeesArr.push({
      name: cells[0].textContent,
      position: cells[1].textContent,
      office: cells[2].textContent,
      age: +cells[3].textContent,
      salary: Number(cells[4].textContent.slice(1).replace(/,/g, '')),
    });
  });
}

extractEmployees();

function renderTable(data) {
  body.innerHTML = '';

  data.forEach((emp) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${emp.name}</td>
      <td>${emp.position}</td>
      <td>${emp.office}</td>
      <td>${emp.age}</td>
      <td>$${emp.salary.toLocaleString()}</td>
    `;

    body.appendChild(row);
  });
}

let sortDirection = 1;

head.querySelectorAll('th').forEach((title, index) => {
  title.addEventListener('click', () => {
    const keys = ['name', 'position', 'office', 'age', 'salary'];
    const key = keys[index];

    employeesArr.sort((a, b) => {
      if (typeof a[key] === 'number') {
        return (a[key] - b[key]) * sortDirection;
      } else {
        return a[key].localeCompare(b[key]) * sortDirection;
      }
    });

    sortDirection *= -1;
    renderTable(employeesArr);
  });
});

// Select row
body.addEventListener('click', (e) => {
  const clickedRow = e.target.closest('tr');

  tr.forEach((row) => {
    row.classList.remove('active');
  });

  clickedRow.classList.add('active');
});
