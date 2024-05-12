import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router ,Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Store from './components/Store';
import About from './components/About';
import Navbar from './components/Navbar';
import ShoppingCartProvider from './context/ShoppingCartContext';

const App = () => {
  return (
    
    <ShoppingCartProvider>
      <Router>
      <Navbar/>
      <Container className='mb-4'>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path='/store' element={<Store />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/*' element={<h1>Error page</h1>}></Route>
        </Routes>
      </Container>
      </Router>
    </ShoppingCartProvider>
  );
}

export default App;

