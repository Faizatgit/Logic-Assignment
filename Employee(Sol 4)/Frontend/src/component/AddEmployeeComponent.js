import React, { useState, useEffect } from 'react';
import EmployeeService from '../service/EmployeeService';
import { Link, useNavigate, useParams } from 'react-router-dom';

const AddEmployeeComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [availability, setAvailability] = useState(false); // Add state for availability
    const navigate = useNavigate();
    const { id } = useParams();

    const employeeData = { firstName, lastName, email, availability }; // Include availability in employee data

    function saveEmployee(e) {
        e.preventDefault();

        if (employeeData.firstName !== "" && employeeData.lastName !== "" && employeeData.email !== "") {
            if (id) {
                EmployeeService.updateEmployee(id, employeeData)
                    .then(() => navigate("/employee"))
                    .catch(e => console.log(e));
            } else {
                EmployeeService.saveEmployee(employeeData)
                    .then(() => navigate("/employee"))
                    .catch(e => console.log(e));
            }
        } else {
            alert("Please fill in all inputs");
        }
    }

    function tile() {
        return id ? "Update Employee" : "Add Employee";
    }

    useEffect(() => {
        if (id) {
            EmployeeService.getEmployeeById(id)
                .then(res => {
                    setFirstName(res.data.firstName);
                    setLastName(res.data.lastName);
                    setEmail(res.data.email);
                    setAvailability(res.data.availability); // Set availability from fetched data
                })
                .catch(e => console.log(e));
        }
    }, [id]);

    return (
        <div>
            <div className='container mt-5'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3'>
                        <h2 className='text-center'>{tile()}</h2>
                        <div className='card-body'>
                            <form>
                                <div className='form-group mb-2'>
                                    <input className='form-control'
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        type="text" placeholder='Enter First Name' />
                                </div>
                                <div className='form-group mb-2'>
                                    <input className='form-control'
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        type="text" placeholder='Enter Last Name' />
                                </div>
                                <div className='form-group mb-2'>
                                    <input className='form-control'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email" placeholder='Enter Email' />
                                </div>
                                {/* Checkbox or toggle button for availability */}
                                <div className="form-check mb-2">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={availability}
                                        onChange={(e) => setAvailability(e.target.checked)}
                                    />
                                    <label className="form-check-label">Available</label>
                                </div>
                                <button onClick={(e) => saveEmployee(e)} className='btn btn-success'>Save</button> {" "}
                                <Link to={"/employee"} className='btn btn-danger' href="">Cancel</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddEmployeeComponent;
    