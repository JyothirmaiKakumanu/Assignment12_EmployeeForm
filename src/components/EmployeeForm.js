import React, { useState } from 'react';
import { Edit, Delete } from '@material-ui/icons';
import { useEffect } from 'react';

const EmployeeForm = () => {


    const initialFormState = {
        empName: '',
        email: '',
        role: '',
        organization: '',
    };
    const [errors, setErrors] = useState("");
    const [formInput, setFormInput] = useState(initialFormState);
    const [display, setDisplay] = useState([]);


    const validateForm = () => {
        let check = false;
        console.log("inside vlaidate");
        if (!formInput.empName || !formInput.email || !formInput.role || !formInput.organization) {
            check = false;
            setErrors("All fields are mandatory");

        } else if (!formInput.empName.match(/^[A-z]+$/)) {
            check = false;
            setErrors("Name is not alphanumeric");
        }
        else if (!formInput.role.match(/^[A-z]+$/)) {
            check = false;
            setErrors("Role is not alphanumeric");
        }
        else if (!formInput.organization.match(/^[A-z0-9]+$/)) {
            check = false;
            setErrors("Organization is not alphanumeric");
        }
        else if (!formInput.email.match(/\S+@\S+\.\S+/)) {
            check = false;
            setErrors("Email must contain @");
        } else {
            check = true;
        }
        return check;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const copyDisplay = [...display, {
                empName: formInput.empName,
                email: formInput.email,
                role: formInput.role,
                organization: formInput.organization,
                edit: false,
                empNameInput: formInput.empName,
                emailInput: formInput.email,
                roleInput: formInput.role,
                organizationInput: formInput.organization
            }];
            console.log("copyDisplay", copyDisplay);
            setDisplay(copyDisplay);
        }
    }

    const onChangeInput = (e) => {
        setFormInput({
            ...formInput,
            [e.target.name]: e.target.value
        });
    }

    const onchangeEditData = (e) => {
        const editDisplay = display.map((item, index) => {
            if (index == e.target.id) {
                return {
                    ...item,
                    [e.target.name]: e.target.value
                }
            } else {
                return item;
            }
        })
        console.log("editDisplay", editDisplay);
        setDisplay(editDisplay);
    }

    const editData = (idx) => {

        const disCopy = display.map((item, index) => {

            if (index == idx) {
                return {
                    ...item,
                    edit: true,
                }
            } else {
                return item;
            }
        })

        setDisplay(disCopy);
    }

    const deleteData = (name) => {

        setDisplay(display.filter((item) => item.empName !== name));
    }

    const saveData = (idx) => {
        const editDisplay = display.map((item, index) => {
            if (index == idx) {
                return {
                    empName: item.empNameInput,
                    email: item.emailInput,
                    role: item.roleInput,
                    organization: item.organizationInput,
                    edit: false,
                    empNameInput: item.empNameInput,
                    emailInput: item.emailInput,
                    roleInput: item.roleInput,
                    organizationInput: item.organizationInput
                }
            } else {
                return item;
            }
        })
        setDisplay(editDisplay);
    }

    const cancelData = (idx) => {
        const editDisplay = display.map((item, index) => {
            if (index == idx) {
                return {
                    empName: item.empName,
                    email: item.email,
                    role: item.role,
                    organization: item.organization,
                    edit: false,
                    empNameInput: item.empNameInput,
                    emailInput: item.emailInput,
                    roleInput: item.roleInput,
                    organizationInput: item.organizationInput
                }
            } else {
                return item;
            }
        })
        setDisplay(editDisplay);
    }


    const renderData = () => {
        console.log("inside render data", display);
        return (display.map((itm, index) => {

            return <tr className="row" key={"emp" + (index)}>
                {index + 1}.
                {itm.edit ?
                    <>
                        <td className="col"><input name="empNameInput" id={index} onChange={onchangeEditData} defaultValue={itm.empName} /></td>
                        <td className="col"><input name="emailInput" id={index} onChange={onchangeEditData} defaultValue={itm.email} /></td>
                        <td className="col"><input name="roleInput" id={index} onChange={onchangeEditData} defaultValue={itm.role} /></td>
                        <td className="col"><input name="organizationInput" id={index} onChange={onchangeEditData} defaultValue={itm.organization} /></td>
                        <td><button id="save" onClick={() => saveData(index)}>Save</button></td>
                        <td><button id="cancel" onClick={() => cancelData(itm.empName)}>Cancel</button></td>
                    </>
                    :
                    <>
                        <td className="col">{itm.empName}</td>
                        <td className="col">{itm.email}</td>
                        <td className="col">{itm.role}</td>
                        <td className="col">{itm.organization}</td>
                        <button id="edit" onClick={()=>editData(index)}><Edit></Edit></button>
                        <button id="delete" onClick={() => deleteData(itm.empName)}><Delete></Delete></button>
                    </>
                }

            </tr>
        })
        )
    }

    const clearForm = () => {
        setErrors("");
        setFormInput({
            empName: '',
            email: '',
            role: '',
            organization: ''
        });
    }

    useEffect(() => {
        console.log("in use effect");
        clearForm();
    }, [display])

    return (
        <>
            <form className="form">
                <div className="container">
                    <div className="row">
                        <div className="m-3 p-2 emp input-form">
                            <label>Employee Name<br />
                                <input type="text" name="empName"
                                    value={formInput.empName}
                                    onChange={onChangeInput}
                                    component="input" />
                            </label>
                        </div>

                        <div className="m-3 p-2 email input-form">
                            <label>Email ID<br />
                                <input type="email" name="email"
                                    value={formInput.email}
                                    onChange={onChangeInput}
                                    component="input" />
                            </label>
                        </div>
                        <div className="m-3 p-2 role input-form">
                            <label>Role<br />
                                <input type="text" name="role"
                                    value={formInput.role}
                                    onChange={onChangeInput}
                                    component="input" />
                            </label>
                        </div>
                        <div className="m-3 p-2 organization input-form">
                            <label>Organization<br />
                                <input type="text" name="organization"
                                    value={formInput.organization}
                                    onChange={onChangeInput}
                                    component="input" />
                            </label>
                        </div>
                    </div>
                </div>
                <button type="submit" id="add" className="btn btn-primary" onClick={handleSubmit}>Add Employee</button>
                {errors.length > 0 ? (
                    <p className="message">{errors}</p>
                ) : null}
            </form>
            <table>
                <tbody>
                    {display.length > 0 ? renderData() : null}
                </tbody>
            </table>
        </>
    );
};


export default EmployeeForm;