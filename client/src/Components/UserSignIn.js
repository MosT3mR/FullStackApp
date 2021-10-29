import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../Context';
import Form from './Form';

const UserSignIn = (props) => {

    let history = useHistory();
    const { actions } = useContext(Context);
    const [ userValues, setUserValues ] = useState({
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        errors: []
    });

    // Destructuring user variables from state for later use
    const { emailAddress, password, errors } = userValues;

    // Handler for changes in input fields updates state
    const change = (event) => {
        setUserValues( prevValues => ({ 
            ...prevValues, 
            [event.target.name]: event.target.value 
        }));
    };

    // Handler for the form submit button ("Sign In") logs in user
    const submit = () => {
        const { from } = props.location.state || { from: { pathname: '/' } };
        actions.signIn(emailAddress, password)
            .then( user => {
                if (user === null) {
                    setUserValues({ errors: [ 'Sign-in was unsuccessful' ] });
                    document.querySelector('FORM').reset();
                } else {
                    history.push(from);
                    console.log(`SUCCESS! ${emailAddress} is now signed in!`);
                }
            }).catch( err => {
                console.log(err);
                history.push('/error');
            });
    };

    // Handler for the cancel button returns to default route (course list)
    const cancel = () => {
        history.push('/');
    }

    return (
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                <Form
                    cancel={cancel}
                    errors={errors}
                    submit={submit}
                    submitButtonText="Sign In"
                    elements={ () => (
                        <>
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
                <p>Don't have an account? Click here to <Link to="/signup">sign up</Link>!</p>
                
            </div>
        </main>
    );
};

export default UserSignIn;
