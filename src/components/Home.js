import React from 'react';
import { Link} from 'react-router-dom';
import FormAction from './FormAction';

const Home = ({action, setaction}) => {
    
    return (
        <>

            <div className="col-md-10 offset-md-1 col-12 text-center heading">
                Welcome to Employee Details page!
            </div>
            <p className="form-action">
                Please choose Form Action
            </p>
            <FormAction action ={action} setaction={setaction}/>
            <Link to="/formtype" exact>
                <button className="btn btn-danger next">Next</button>
            </Link>

        </>
    );
};

export default Home;