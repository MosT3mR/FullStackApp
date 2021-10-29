import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Context } from './Context';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { authenticatedUser } = useContext(Context);
    return (
        <Route
            {...rest}
            render={props => authenticatedUser ? (
                // If user is authenticated render the component
                <Component {...props} />
                ) : (
                // If user is not authenticated redirect to login
                <Redirect to={{ 
                    pathname: '/signin',
                    state: { from: props.location } 
                }} />
                )
            }
        />
  );
};

export default PrivateRoute;
