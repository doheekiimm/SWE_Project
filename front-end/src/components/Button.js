import React from 'react';

import '../css/Button.css';

const Button = (props) => {

const classes = "button " + props.className
  return (
    <button
      className={classes}
      type={props.type || 'button'}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;