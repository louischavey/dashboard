import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Homepage from "./pages/Homepage/Homepage"
import FileRun from "./pages/FileRun/FileRun"

import './App.css'

function App() {
  return (
      <>
      <Router>
        <Routes>
          <Route path={"/"} element={ <Homepage /> }/>
          <Route path={"/runFile"} element = { <FileRun/> } /> 
        </Routes>
      </Router>
      </>
  );
}

export default App;


