const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 5000;
const app = express();

const allCompanies = require('./data/companies.json');
const allEmployees = require('./data/employees.json');
const allProjects = require('./data/projects.json');

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.static(path.join(__dirname, './data')));
app.use(bodyParser.json());

app.get('/navigation', (req, res) => {
  const TreeNodeType = require('./constants');

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

app.get('/company/:id', (req, res) => {
  const requestedCompanyId = req.params.id;
  const addresses = require('./data/company-addresses.json');

  const selectedCompany = allCompanies.find(
    (company) => company.id === requestedCompanyId
  );
  const { id, companyId, ...companyAddress } = addresses.find(
    (address) => address.companyId === requestedCompanyId
  );
  const companyProjects = allProjects.filter(
    (project) => project.companyId === requestedCompanyId
  );
  const companyEmployees = allEmployees.filter(
    (e) => e.companyId === selectedCompany.id
  );

  res.send({
    ...selectedCompany,
    address: companyAddress,
    projects: companyProjects,
    employees: companyEmployees,
  });
});

app.put('/project/:id', (req, res) => {
  console.log(req.params);
  console.log(JSON.stringify(req.body));
  const { id } = req.params;
  const { name, department, employeesId } = req.body;
  const filePath = path.join(__dirname, './data/projects.json');
  const projectToUpdate = allProjects.find((p) => p.id === id);

  projectToUpdate.name = name;
  projectToUpdate.department = department;
  projectToUpdate.employeesId = employeesId;

  fs.writeFile(filePath, JSON.stringify(allProjects, null, 2), (err) => {
    if (err) return console.log(err);
    console.log('writing to ' + filePath);
  });

  res.sendStatus(200);
});

app.get('/projects', (req, res) => {
  res.sendFile(path.join(__dirname, './data/projects.json'));
});

app.get('/company-addresses', (req, res) => {
  res.sendFile(path.join(__dirname, './data/company-addresses.json'));
});

app.listen(PORT);
console.log('Server listening on port:', PORT);
