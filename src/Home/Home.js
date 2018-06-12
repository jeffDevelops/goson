import React, { Component } from 'react';

import Button from '../styled/Button';
import Backdrop from '../Backdrop/Backdrop';

import './Home.css';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>

        <Backdrop />
        <div className="scrim" />

        <div className="call_to_action_buttons">
          <Button callToAction >I'm In</Button>
          <Button out > I'm Out</Button>
        </div>

      </div>
    );
  }
}