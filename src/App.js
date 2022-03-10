import React, { Component } from 'react';
import {Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import About from './components/About'
import Home from './components/Home'

class App extends Component {
  render() {
    return (

    <div className="container">
      <p>Welcome to React</p>
        <Routes>
          <Route path="/" element={< Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
        </Routes>

    </div>
    );
  }
}

export default App;