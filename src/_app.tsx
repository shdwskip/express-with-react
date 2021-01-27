import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from '@material-ui/core';

const App: React.FC = () => {
  const [companies, setCompanies] = useState([]);

  console.log(companies);
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <Button
          variant='contained'
          onClick={() =>
            fetch('http://localhost:5000/companies')
              .then((res) => res.json())
              .then((data) => setCompanies(data))
              .catch((err) => console.error(err))
          }
        >
          Get companies
        </Button>

        <Button
          onClick={() =>
            fetch('http://localhost:5000/employees')
              .then((res) => res.json())
              .then((data) => setCompanies(data))
              .catch((err) => console.error(err))
          }
        >
          Get employees
        </Button>

        <Button
          onClick={() =>
            fetch('http://localhost:5000/projects')
              .then((res) => res.json())
              .then((data) => setCompanies(data))
              .catch((err) => console.error(err))
          }
        >
          Get projects
        </Button>

        <Button
          onClick={() =>
            fetch('http://localhost:5000/company-addresses')
              .then((res) => res.json())
              .then((data) => setCompanies(data))
              .catch((err) => console.error(err))
          }
        >
          Get company addresses
        </Button>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
