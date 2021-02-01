const express = require('express');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.static(path.join(__dirname, './data')));

app.get('/navigation', (req, res) => {
  const TreeNodeType = require('./constants');
  const allCompanies = require('./data/companies.json');
  const allEmployees = require('./data/employees.json');

  const navigationNodes = allCompanies.map((company) => {
    const companyEmployees = allEmployees.filter(
      (e) => company.id === e.companyId
    );
    const children = [];

    companyEmployees.reduce((accumulated, currentEmployee) => {
      const employeeNode = {
        id: currentEmployee.id,
        type: TreeNodeType.EMPLOYEE,
        name: `${currentEmployee.firstName} ${currentEmployee.lastName}`,
      };

      if (children.some((e) => e.name === currentEmployee.jobArea)) {
        const currentJobArea = children.filter(
          (j) => j.name === currentEmployee.jobArea
        )[0];
        currentJobArea.children.push(employeeNode);
      } else {
        children.push({
          id: `${currentEmployee.jobArea}-${company.id}`,
          name: currentEmployee.jobArea,
          type: TreeNodeType.JOBAREA,
          children: [employeeNode],
        });
      }

      return currentEmployee;
    }, {});

    return {
      id: company.id,
      name: company.name,
      type: TreeNodeType.COMPANY,
      children,
    };
  });

  res.send(navigationNodes);
});

app.get('/employees', (req, res) => {
  res.sendFile(path.join(__dirname, './data/employees.json'));
});

app.get('/projects', (req, res) => {
  res.sendFile(path.join(__dirname, './data/projects.json'));
});

app.get('/company-addresses', (req, res) => {
  res.sendFile(path.join(__dirname, './data/company-addresses.json'));
});

app.listen(PORT);
console.log('Server listening on port:', PORT);
