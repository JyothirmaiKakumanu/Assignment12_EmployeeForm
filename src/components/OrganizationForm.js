import React, { useState } from 'react';
import { Edit, Delete } from '@material-ui/icons';


const OrganizationForm = () => {

    const initialFormState = {
        orgName: '',
        orgSize: '',
        orgDesc: '',
    };
    const [errors, setErrors] = useState("");
    const [formInput, setFormInput] = useState(initialFormState);
    const [display, setDisplay] = useState([]);

    const validateForm = () => {
        let check = false;
        console.log("inside vlaidate");
        if (!formInput.orgName || !formInput.orgSize || !formInput.orgDesc) {
            check = false;
            setErrors("All fields are mandatory");

        } else if (!formInput.orgName.match(/^[A-z]+$/)) {
            check = false;
            setErrors("Name is not alphanumeric");
        }
        else if (!formInput.orgSize.match(/^[0-9]+$/)) {
            check = false;
            setErrors("Size is not Numeric");
        }
        else if (!formInput.orgDesc.match(/^[A-z0-9]+$/)) {
            check = false;
            setErrors("Description is not alphanumeric");
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
                orgName: formInput.orgName,
                orgSize: formInput.orgSize,
                orgDesc: formInput.orgDesc,
                edit: false,
                orgNameInput: formInput.orgName,
                orgSizeInput: formInput.orgSize,
                orgDescInput: formInput.orgDesc,
            }];
            console.log("copyDisplay", copyDisplay);
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

        setDisplay(display.filter((item) => item.orgName !== name));
    }

    const saveData = (idx) => {
        const editDisplay = display.map((item, index) => {
            if (index == idx) {
                return {
                    orgName: item.orgNameInput,
                    orgSize: item.orgSizeInput,
                    orgDesc: item.orgDescInput,
                    edit: false,
                    orgNameInput: item.orgNameInput,
                    orgSizeInput: item.orgSizeInput,
                    orgDescInput: item.orgDescInput,
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
                    orgName: item.orgName,
                    orgSize: item.orgSize,
                    orgDesc: item.orgDesc,
                    edit: false,
                    orgNameInput: item.orgNameInput,
                    orgSizeInput: item.orgSizeInput,
                    orgDescInput: item.orgDescInput,
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

            return <tr className="row" key={"Org" + (index)}>
                {index + 1}.
                {itm.edit ?
                    <>
                        <td className="col"><input name="orgNameInput" id={index} onChange={onchangeEditData} defaultValue={itm.orgName} /></td>
                        <td className="col"><input name="orgSizeInput" id={index} onChange={onchangeEditData} defaultValue={itm.orgSize} /></td>
                        <td className="col"><input name="orgDescInput" id={index} onChange={onchangeEditData} defaultValue={itm.orgDesc} /></td>
                        <td><button id="save" onClick={() => saveData(index)}>Save</button></td>
                        <td><button id="cancel" onClick={() => cancelData(index)}>Cancel</button></td>
                    </>
                    :
                    <>
                        <td className="col">{itm.orgName}</td>
                        <td className="col">{itm.orgSize}</td>
                        <td className="col">{itm.orgDesc}</td>
                        <button id="edit" onClick={()=>editData(index)}><Edit></Edit></button>
                        <button id="delete" onClick={() => deleteData(itm.orgName)}><Delete></Delete></button>
                    </>
                }

            </tr>
        })
        )
    }

    


    return (
        <>
            <form className="form">
                <div className="container">
                    <div className="row">
                        <div className="m-3 p-2 orgName input-form">
                            <label>Organization Name<br />
                                <input type="text" name="orgName"
                                    value={formInput.orgName}
                                    onChange={onChangeInput} />
                            </label>
                        </div>
                        <div className="m-3 p-2 size input-form">
                            <label>Size of Unit<br />
                                <input type="text" name="orgSize"
                                    value={formInput.orgSize}
                                    onChange={onChangeInput} />
                            </label>
                        </div>
                        <div className="m-3 p-2 desc input-form">
                            <label>Organization Description<br />
                                <input type="text" name="orgDesc"
                                    value={formInput.orgDesc}
                                    onChange={onChangeInput} />
                            </label>
                        </div>
                    </div>
                </div>
                <button type="submit" id="add" className="btn btn-primary" onClick={handleSubmit}>Add Organization</button>
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

export default OrganizationForm;