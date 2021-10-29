import { Link } from 'react-router-dom';

const Forbidden = () => {
    return (
        <main>
            <div className="form--centered">
                <h2>Access Denied</h2>
                <p>Sorry, you do not have access permission.</p>
                <Link className="button button-secondary" to="/">Return to Course List</Link>
                <Link className="button button-secondary" to="/signin">Switch Accounts</Link>
            </div>
        </main>
    );
};

export default Forbidden;
