import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import WidgetsList from "./components/WidgetsList";
import CreateWidget from "./components/CreateWidget";
import UpdateWidget from "./components/UpdateWidget";

const App = () => (
    <Router>
        <nav>
            <Link to="/">Widgets List</Link> | <Link to="/create">Create Widget</Link> |{" "}
            <Link to="/update">Update Widget</Link>
        </nav>
        <Routes>
            <Route path="/" element={<WidgetsList />} />
            <Route path="/create" element={<CreateWidget />} />
            <Route path="/update" element={<UpdateWidget />} />
        </Routes>
    </Router>
);

export default App;




/*
import React from 'react'
import './App.css'
import Stack from '@mui/material/Stack'

import WidgetList from './components/WidgetList'

const App = () => {
  return (<Stack>
    <WidgetList></WidgetList>
  </Stack>)
}

export default App
*/