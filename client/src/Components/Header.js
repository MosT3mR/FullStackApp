import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context';

const Header = () => {
    const { authenticatedUser } = useContext(Context);
    
    // Checks if a user is logged in
    let authUser = '';
    if (authenticatedUser) {
        authUser = `${authenticatedUser.firstName} ${authenticatedUser.lastName}`;
    }
    
    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><Link to="/">Skills Academy Courses</Link></h1>
                <nav>
                    { /* If user is logged in, render greeting and "Sign Out" button */
                    authenticatedUser ? 
                        <ul className="header--signedin">
                            <li>Welcome, {authUser}!</li>
                            <li><Link to="/signout">Sign Out</Link></li> 
                        </ul> 
                    : /* If user is not logged in render "Sign In" and "Sign Up" buttons */
                        <ul className="header--signedout">
                            <li><Link to="/signup">Sign Up</Link></li>
                            <li><Link to="/signin">Sign In</Link></li>
                        </ul>
                    }
                </nav>
            </div>
        </header>
    );
};

export default Header;