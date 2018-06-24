import React from 'react';

const Group = (props) => (
  <div style={
    { 
      position: 'absolute',
      top: props.top ? props.top + 'px' : '',
      left: props.left ? props.left + 'px' : '',
      right: props.right ? props.right + 'px' : '',
      bottom: props.bottom ? props.bottom + 'px' : '',
      width: '60%',
      margin: 'auto',

      textAlign: props.justify === 'right' && window.innerWidth > 700 ? 'right' : 'left',
    
    }
  }>
    { props.children }
  </div>
);

export default Group;