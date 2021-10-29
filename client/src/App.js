import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import PrivateRoute from './PrivateRoute';

import Header from './Components/Header';
import Courses from './Components/Courses';
import UserSignIn from './Components/UserSignIn';
import UserSignUp from './Components/UserSignUp';
import UserSignOut from './Components/UserSignOut';
import CourseDetail from './Components/CourseDetail';
import CreateCourse from './Components/CreateCourse';
import UpdateCourse from './Components/UpdateCourse';
import DeleteCourse from './Components/DeleteCourse';
import NotFound from './Components/NotFound';
import Forbidden from './Components/Forbidden';
import UnhandledError from './Components/UnhandledError'

function App() {
    return (
        <BrowserRouter forceRefresh={true}>
            <Header />
            <Switch>
                <Route exact path="/" component={Courses} />
                <PrivateRoute path="/courses/create" component={CreateCourse} />
                <PrivateRoute path="/courses/:id/update" component={UpdateCourse} />
                <PrivateRoute path="/courses/:id/delete" component={DeleteCourse} />
                <Route path="/courses/:id" component={CourseDetail} /> 
                <Route path="/signin" component={UserSignIn} />
                <Route path="/signup" component={UserSignUp} />
                <Route path="/signout" component={UserSignOut} />
                <Route path="/notfound" component={NotFound} />
                <Route path="/forbidden" component={Forbidden} />
                <Route path="/error" component={UnhandledError} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
