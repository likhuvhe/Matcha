import React from 'react'
import Register from './component/register'
import Home from './component/Home'
import Header from './component/header'
import Login from './component/login'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Body from './component/Body';

const App = () => {
  return (
    <div style={{backgroundColor: 'orange', marginTop:0}}>
    <Header />
    <Body>
      <Router>
        <Switch>
        <Route exact path = "/" component={Home}/>
        <Route path="/register" component={Register}/> 
        <Route path = "/Login" component ={Login}/>    
        </Switch>
      </Router>
      </Body>
    </div>
  )
}

export default App
