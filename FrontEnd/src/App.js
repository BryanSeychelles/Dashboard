import logo from './logo.svg';
import { React } from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Inscription } from './Component/Forms/authentification'
import { DashBoard } from './Component/Home'
import { Service } from './Component/Forms/services'
import { Menu } from './Component/Navbar'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faArrowDown, faArrowUp, faCloud, faEllipsisH, faTimes } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faEllipsisH, faTimes, faArrowUp, faArrowDown, faCloud, faGithub)

function App() {
  return (
    <div>

      <Router>
        <Switch>
          <Route path ="/home">
            <div className="App">
              <Menu/>
            </div>
            <DashBoard/>
          </Route>
          <Route exact path ="/">
            <Inscription/>
          </Route>
          <Route exact path ="/services">
            <Service/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
