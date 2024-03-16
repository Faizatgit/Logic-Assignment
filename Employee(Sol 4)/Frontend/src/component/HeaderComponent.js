// HeaderComponent.js

import React, { useState, useEffect } from 'react';
import EmployeeService from '../service/EmployeeService';

const HeaderComponent = () => {
    const [totalEmployees, setTotalEmployees] = useState(0);
    const [availableEmployees, setAvailableEmployees] = useState(0);

    useEffect(() => {
        fetchEmployeeStats();
    }, []);

    const fetchEmployeeStats = () => {
        EmployeeService.getAllEmployee()
            .then(res => {
                setTotalEmployees(res.data.length);
                const available = res.data.filter(employee => employee.available);
                setAvailableEmployees(available.length);
            })
            .catch(error => console.log(error));
    };

    return (
        <div>
            <header>
                <nav className='navbar navbar-expand-md navbar-dark bg-dark p-3'>
                    <div>
                        <a className='navbar-brand m-5' href="/">Employee Management System</a>
                    </div>
                    <div className="navbar-text mr-3">
                        Total Employees: {totalEmployees} | Available Employees: {availableEmployees}
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default HeaderComponent;
