import './App.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import EmployeeForm from './components/EmployeeForm';
import RoleForm from './components/RoleForm';
import OrganizationForm from './components/OrganizationForm';
import FormType from './components/FormType';


function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <div className="col-md-10 offset-md-1 col-12 text-center heading">
              Welcome to Employee Details page!
            </div>
            <FormType />
          </Route>
          <Route path="/employee">
            <h3 className="formName">Employee Form</h3>
            <EmployeeForm/>
            <Link to="/">
              <button className="btn btn-danger back">Back</button>
            </Link>
          </Route>
          <Route path="/role">
            <h3 className="formName">Role Form</h3>
            <RoleForm/>
            <Link to="/">
              <button className="btn btn-danger back">Back</button>
            </Link>
          </Route>
          <Route path="/organization">
            <h3 className="formName">Organization Form</h3>
            <OrganizationForm/>
            <Link to="/">
              <button className="btn btn-danger back">Back</button>
            </Link>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
