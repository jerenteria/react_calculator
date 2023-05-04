import React from 'react';
import classes from './Display.module.css'

const Display = (props) => {
    return (
        <div className={ `${classes.Display}` }>
            {props.data}
        </div>
    );
};

export default Display;