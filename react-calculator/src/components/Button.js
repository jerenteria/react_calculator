import React from 'react';
import classes from './Button.module.css';

const Button = (props) => {
    return (
        <button 
        className={`${classes.Button} ${props.className}`}
        onClick={props.onClick}
        value={props.value}>
            {props.label}
        </button>
    )
};

export default Button;