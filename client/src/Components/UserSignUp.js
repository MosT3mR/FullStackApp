import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../Context';
import Form from './Form';

const UserSignUp = (props) => {

    let history = useHistory();
    const { data, actions } = useContext(Context);
    const [ userValues, setUserValues ] = useState({
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        errors: []
    });

    // Destructuring for later use
    const { errors } = userValues;

    // Handler for changes in form inputs updates state
    const change = (event) => {
        setUserValues( prevValues => ({ 
            ...prevValues, 
            [event.target.name]: event.target.value 
        }));
    };
    
    // Handler for form submit to create a new user
    const submit = () => {
        const { firstName, lastName, emailAddress, password } = userValues;
        const user = { firstName, lastName, emailAddress, password };
        const { from } = props.location.state || { from: { pathname: '/' } };
        data.createUser(user)
            .then( errs => {
                if (errs.length) {
                    setUserValues({errors: errs});
                    document.querySelector('FORM').reset();
                } else {
                    actions.signIn(emailAddress, password)
                        .then(() => history.push(from));
                }
            }).catch( err => {
                console.log(err);
                history.push('/error');
            });
    };

    // Handler for the cancel button returns to default route (course list)
    const cancel = () => {
        history.push('/');
    };

    return (
        <main>
            <div className="form--centered">
                <h2>Sign Up</h2>
                <Form
                    cancel={cancel}
                    errors={errors}
                    submit={submit}
                    submitButtonText="Sign Up"
                    elements={ () => (
                        <>
                            <label htmlFor="firstName">First Name</label>
                            <input 
                                id="firstName" 
                                name="firstName" 
                                type="text"
                                onChange={change} />
                            
                            <label htmlFor="lastName">Last Name</label>
                            <input 
                                id="lastName" 
                                name="lastName" 
                                type="text"
                                onChange={change} />
                            
                            <label htmlFor="emailAddress">Email Address</label>
                            <input 
                                id="emailAddress" 
                                name="emailAddress" 
                                type="email"
                                onChange={change} />
                            
                            <label htmlFor="password">Password</label>
                            <input 
                                id="password" 
                                name="password" 
                                type="password"
                                onChange={change} />
                        </>
                    )} />
                <p>Already have an account? Click here to <Link to="/signin">sign in</Link>!</p>
            </div>
        </main>
    );
};

export default UserSignUp;
