/**
 * This file sets up the Context to allow data to pass throughout
 * the app component tree using the React Context API
 */
import React, { useState } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

export const Context = React.createContext();

export const Provider = (props) => {

    const userCookie = Cookies.get('authenticatedUser');
    const courseCookie = Cookies.get('validCourseIDs');

    const [ authenticatedUser, setAuthUser ] = useState(
        userCookie ? JSON.parse(userCookie) : null
    );

    const [ validCourseIDs, setValidCourseIDs ] = useState(
        courseCookie ? courseCookie : null
    );

    const [ data ] = useState(new Data());

    // Method that authenticates user and persists their info in global state
    const signIn = async (emailAddress, password) => {
        const user = await data.getUser(emailAddress, password);
        if (user !== null) {
            user.password = password;
            setAuthUser(user);
            Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1});
        }
        return user;
    };

    // Method that removes authenticated user from global atate
    const signOut = () => {
        setAuthUser(null);
        Cookies.remove('authenticatedUser');
    };

    // Method that sets the array of valid course IDs
    const setIDs = (IDs) => {
        setValidCourseIDs(IDs);
        Cookies.set('validCourseIDs', IDs, {expires: 1});
    }

    return (
        <Context.Provider value={{ 
            authenticatedUser,
            validCourseIDs,
            data,
            actions: { signIn, signOut, setIDs }
        }}>
            {props.children}
        </Context.Provider>
    );
}