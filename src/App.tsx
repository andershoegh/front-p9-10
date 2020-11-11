import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.scss'
import WelcomePage from './Components/Pages/WelcomePage'
import advertisement from './Resources/Images/advertisement.svg'

const App = () => {
    return (
        <Router>
            <div className="App">
                <img
                    className="advertisement"
                    src={advertisement}
                    alt="Advertisement of corn dog"
                />{' '}
            </div>
            <Switch>
                <Route path="/mainpage">
                    <></>
                </Route>
                <Route path="/menuselection">
                    <></>
                </Route>
                <Route path="/orderoverview">
                    <></>
                </Route>
                <Route path="/">
                    <WelcomePage />
                </Route>
            </Switch>
        </Router>
    )
}

export default App
