import React from 'react';


const FormAction = ({action, setaction}) => {
    

    return (
        <>
            <div className="my-3 employee nav-form-action">
                <input type="radio" value="addform" className="btn btn-primary" 
                checked={action === "addform"} 
                onChange={(e)=>setaction(e.target.value)}/>
                Add Form
            </div>
            <div className="my-3 role nav-form-action">
                <input type="radio" value="editform" className="btn btn-primary" 
                checked={action === "editform"}
                onChange={(e)=>setaction(e.target.value)} />
                Edit Form
            </div>
            <div className="my-3 org nav-form-action">
                <input type="radio" value="deleteform" className="btn btn-primary" 
                checked={action === "deleteform"}
                onChange={(e)=>setaction(e.target.value)} />
                Delete Form
            </div>
        </>
    );
};

export default FormAction;