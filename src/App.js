import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import debounce from './helpers/debounce';

import Home from './Home/Home';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      windowWidth: window.innerWidth
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.debouncedHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.debouncedHandler);
  }

  resizeHandler = () => this.setState({ windowWidth: window.innerWidth });

  debouncedHandler = debounce(200, this.resizeHandler);

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" render={(props) => (
            <Home windowWidth={ this.state.windowWidth }/>
          )} />
        </Switch>
      </Router>
    );
  }
}

export default App;
