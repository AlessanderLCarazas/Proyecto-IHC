import React from 'react';
import Header from './components/Header'
import Footer from './components/Footer'

import './App.css';

function App() {
  return (
    <div>
      <Header />
      <main>
        <h2>Bienvenido a LOVART</h2>
        <p>Aquí puedes compartir y descubrir arte.</p>
      </main>
      <Footer />
    </div>
  );
}

export default App;
