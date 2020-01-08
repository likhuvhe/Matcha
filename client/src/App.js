import React from 'react'
import Register from './component/register'
import Home from './component/Home'
import Header from './component/header'
import Login from './component/login'
import UserProfile from './component/userProfile'
import ForgetPwd from './component/forgetPassword/forgetPwd'
import ResetPwd from './component/forgetPassword/resetPwd'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Body from './component/Body';

const App = () => {
  return (
    <div style={{backgroundColor: 'orange', marginTop:0}}>
    <Header/>
    <Body>
      <Router>
        <Switch>
        <Route exact path = "/" component={Home}/>
        <Route path="/register" component={Register}/> 
        <Route path = "/login" component ={Login}/>
        <Route path = "/userProfile" component ={UserProfile}/>
        <Route path = "/forgetPassword/forgetPwd" component={ForgetPwd}/>
        <Route path = "/forgetPassword/resetPwd" component={ResetPwd}/>
        </Switch>
      </Router>
      </Body>
    </div>
  )
}
export default App