import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';
import '../css/navbar.css'

const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: '#ff9900' };
    else return { color: '#ffffff' };
};


const Menu = ({ history }) => (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/')} to="/">
                        Fitdeck
                </Link>
                </li>
            </ul>
        </div>
        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
            <ul className="navbar-nav ml-auto">

                {/* <li className="nav-item">
                    <Link
                        className={history.location.pathname === '/users' ? 'active nav-link' : 'not-active nav-link'}
                        to="/users"
                    >
                        Users
                </Link>
                </li> */}

                <li className="nav-item">
                    <Link to={`/post/create`} style={isActive(history, `/post/create`)} className="nav-link">
                        Create Post
                </Link>
                </li>

                {!isAuthenticated() && (
                    <React.Fragment>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">
                                Sign In
                        </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">
                                Sign Up
                        </Link>
                        </li>
                    </React.Fragment>
                )}

                {isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                    <li className="nav-item">
                        <Link to={`/admin`} style={isActive(history, `/admin`)} className="nav-link">
                            Admin
                    </Link>
                    </li>
                )}

                {isAuthenticated() && (
                    <React.Fragment>
                        <li className="nav-item">
                            <Link to={`/findpeople`} style={isActive(history, `/findpeople`)} className="nav-link">
                                Find People
                        </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                to={`/user/${isAuthenticated().user._id}`}
                                style={isActive(history, `/user/${isAuthenticated().user._id}`)}
                                className="nav-link"
                            >
                                {`${isAuthenticated().user.name}'s profile`}
                            </Link>
                        </li>

                        <li className="nav-item">
                            <span
                                className="nav-link  navbar-right"
                                style={{ cursor: 'pointer', color: '#fff' }}
                                onClick={() => signout(() => history.push('/'))}
                            >
                                Sign Out
                        </span>
                        </li>
                    </React.Fragment>
                )}
            </ul>
        </div></nav>
);

export default withRouter(Menu);
