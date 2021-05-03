import React, { useState } from 'react';
import { Edit, Delete } from '@material-ui/icons';

const RoleForm = () => {

    const initialFormState = {
        roleName: '',
        roleDesc: '',
    };
    const [errors, setErrors] = useState("");
    const [formInput, setFormInput] = useState(initialFormState);
    const [display, setDisplay] = useState([]);


    const validateForm = () => {
        let check = false;
        if (!formInput.roleName || !formInput.roleDesc) {
            check = false;
            setErrors("All fields are mandatory");

        } else if (!formInput.roleName.match(/^[A-z]+$/)) {
            check = false;
            setErrors("Role Name is not alphanumeric");
        }
        else if (!formInput.roleDesc.match(/^[A-z0-9]+$/)) {
            check = false;
            setErrors("Role Description is not Alphanumeric");
        }
        else {
            check = true;
        }
        return check;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const copyDisplay = [...display, {
                roleName: formInput.roleName,
                roleDesc: formInput.roleDesc,
                edit: false,
                roleNameInput: formInput.roleName,
                roleDescInput: formInput.roleDesc,
            }];
            setDisplay(copyDisplay);
            setErrors("");
            setFormInput(initialFormState);
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

        setDisplay(display.filter((item) => item.roleName !== name));
    }

    const saveData = (idx) => {
        const editDisplay = display.map((item, index) => {
            if (index == idx) {
                // console.log("in save",currentInput);
                return {
                    roleName: item.roleNameInput,
                    roleDesc: item.roleDescInput,
                    edit: false,
                    roleNameInput: item.roleNameInput,
                    roleDescInput: item.roleDescInput,
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
                    roleName: item.roleName,
                    roleDesc: item.roleDesc,
                    edit: false,
                    roleNameInput: item.roleNameInput,
                    roleDescInput: item.roleDescInput,
                }
            } else {
                return item;
            }
        })
        setDisplay(editDisplay);
    }

    const renderData = () => {

        return (display.map((itm, index) => {

            return <tr className="row" key={"Role" + (index)}>
                {index + 1}.
                {itm.edit ?
                    <>
                        <td className="col"><input name="roleNameInput" id={index} onChange={onchangeEditData} defaultValue={itm.roleName} /></td>
                        <td className="col"><input name="roleDescInput" id={index} onChange={onchangeEditData} defaultValue={itm.roleDesc} /></td>
                        <td><button id="save" onClick={() => saveData(index)}>Save</button></td>
                        <td><button id="cancel" onClick={() => cancelData(index)}>Cancel</button></td>
                    </>
                    :
                    <>
                        <td className="col"> {itm.roleName}</td>
                        <td className="col">{itm.roleDesc}</td>
                        <td><button id="edit" onClick={() => editData(index)}><Edit></Edit></button></td>
                        <td><button id="delete" onClick={() => deleteData(itm.roleName)}><Delete></Delete></button></td>
                    </>
                }

            </tr>
        })
        )
    }


    // const clearForm = () => {
    //     setErrors("");
    //     setFormInput({
    //         roleName: '',
    //         roleDesc: '',
    //     });
    // }

    // useEffect(() => {
    //     console.log("in use effect");
    //     clearForm();
    // }, [display])

    return (
        <>
            <form className="form">
                <div className="container">
                    <div className="row">
                        <div className="m-3 p-2 roleName input-form">
                            <label>Role Name<br />
                                <input type="text" name="roleName"
                                    value={formInput.roleName}
                                    onChange={onChangeInput} />
                            </label>
                        </div>
                        <div className="m-3 p-2 roleDesc input-form">
                            <label>Role Description<br />
                                <input type="text" name="roleDesc"
                                    value={formInput.roleDesc}
                                    onChange={onChangeInput} />
                            </label>
                        </div>
                    </div>
                </div>
                <button type="submit" id="add" className="btn btn-primary" onClick={handleSubmit}>Add Role</button>
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
export default RoleForm;