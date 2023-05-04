import React from 'react';
import classes from './Display.module.css';

const Keypad = (props) => {
    return (
        <div className={ `${classes.Keypad}` }>
            {props.children}
        </div>
    )
};


export default Keypad;