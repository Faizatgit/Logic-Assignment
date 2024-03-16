import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EmployeeService from '../service/EmployeeService';
import SearchComponent from './SearchComponent';

const ListEmployeeComponent = () => {
  const [employeeArray, setEmployeeArray] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    getAllEmployee();
  }, [page]);

  const getAllEmployee = () => {
    EmployeeService.getAllEmployee(page, pageSize)
      .then((res) => setEmployeeArray(res.data))
      .catch((e) => console.log(e));
  };

  const toggleAvailability = (id, currentAvailability) => {
    const updatedAvailability = !currentAvailability;
    EmployeeService.updateEmployeeAvailability(id, updatedAvailability)
      .then(() => {
        getAllEmployee();
      })
      .catch((e) => console.log(e));
  };

  const deleteEmployee = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      EmployeeService.deleteEmployee(id)
        .then(() => getAllEmployee())
        .catch((e) => console.log(e));
    }
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    EmployeeService.searchEmployeeByName(searchTerm)
      .then((res) => setEmployeeArray(res.data))
      .catch((e) => console.log(e));
  };

  return (
    <div className="container">
      <Link to="/add-employee" className="btn btn-primary mb-2 mt-3">
        Add Employee
      </Link>
      <h2 className="text-center mb-4">List Employee</h2>
      <SearchComponent handleSearch={handleSearch} />
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee First Name</th>
            <th>Employee Last Name</th>
            <th>Employee Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employeeArray.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>
                <Link
                  to={`/add-employee/${employee.id}`}
                  className="btn btn-info"
                >
                  Update
                </Link>{" "}
                <button
                  onClick={() => deleteEmployee(employee.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>{" "}
                <button
                  onClick={() => toggleAvailability(employee.id, employee.available)}
                  className="btn btn-success">
                  {employee.available ? 'Available' : 'Unavailable'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default ListEmployeeComponent;
