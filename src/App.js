import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Home from './Home/Home';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <Route path="/" render={(props) => (
            <Home />
          )} />
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
