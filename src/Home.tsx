import React, { useEffect, useState } from 'react';
import './App.css';

function Home() {

  useEffect ( () => {
    document.title = "Store Page Store - home"
  })

  return (
    <div id="wrapper">
      <nav className="navbar">
        <a href="/">
          <div className="site-name">
            <h2>Store Page Store</h2>
          </div>
        </a>
        <a href="/ranking">
          rankings
        </a>
      </nav>
      <main>
        <p>Welcome to store page store!</p>
        <p>Navigate using the navbar above.</p>
      </main>
    </div>
  );
}

export default Home;
