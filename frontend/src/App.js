import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Header from './components/layout/Header/Header'
import CoverImage from './components/layout/CoverImage/CoverImage'
import Dashboard from './components/main/Dashboard'
import SideContactBox from './components/main/SideContactBox'
import ScrollToTop from './ScrollToTop'

import './App.sass'

function App() {
  const isIE11 = !!window.MSInputMethodContext && !!document.documentMode
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Header />
          <ScrollToTop>
            <CoverImage />
            <div className="main-container">
              <Dashboard isIE11={isIE11} />
              <SideContactBox />
            </div>
          </ScrollToTop>
        </header>
      </Router>
    </div>
  )
}

export default App
