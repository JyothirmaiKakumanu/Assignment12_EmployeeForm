import React from 'react';
import { Link } from 'react-router-dom';

const FormType = () => {
    return (
        <div>

            <p className="form-type">
                Please choose Form Type
           </p>
            <div className="my-3 employee nav-form">
                <Link to="/employee">
                    <button className="btn btn-primary">Employee Form</button>
                </Link>
            </div>
            <div className="my-3 role nav-form">
                <Link to="/role">
                    <button className="btn btn-primary">Role Form</button>
                </Link>
            </div>
            <div className="my-3 org nav-form">
                <Link to="/organization">
                    <button className="btn btn-primary">Organization Form</button>
                </Link>
            </div>
            <Link to="/" exact>
                <button className="btn btn-danger back">Back</button>
            </Link>
        </div>
    );
};

export default FormType;