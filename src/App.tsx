import React from 'react';
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom';

import './App.css';

import { ReminderCreation } from './pages/ReminderCreation';
import { ReminderDetails } from './pages/ReminderDetails';

const App = () => {

  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route path="/ReminderDetails">
            <ReminderDetails />
          </Route>
          <Route path="/">
            <ReminderCreation />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
