import { hot } from 'react-hot-loader/root';
import React from 'react';
import GLCheckbox from '../src/components/checkbox/checkbox';

/* 

This app is for local testing only.  The output of any library should be a component to NPM.

If you have pieces of DOM you want to test, add in the return statement below.

Think of this as your local sandbox to further assist with development.

*/


const App = () => {

    return (
        <>
            <GLCheckbox name="local" label="Hello"/>
        </>
    );
}

export default hot(App);