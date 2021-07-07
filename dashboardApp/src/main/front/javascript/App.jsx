// import React from 'react'
// import '../css/App.css';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { DashBoard } from './Component/Home'
// import { Menu } from './Component/Navbar'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
// import { faArrowDown, faArrowUp, faEllipsisH, faTimes } from '@fortawesome/free-solid-svg-icons'

// library.add(fab, faEllipsisH, faTimes, faArrowUp, faArrowDown)

// function App() {
//   return (
//     <div>
//       <div className="App">
//         <Menu/>
//       </div>
//       <Router>
//         <Switch>
//           <Route>
//             <DashBoard/>
//           </Route>
//         </Switch>
//       </Router>
//     </div>
//   );
// }

// export default App;

import React from 'react'
import '../css/App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Inscription } from './Component/Forms/authentification'
import { DashBoard } from './Component/Home'
import { Menu } from './Component/Navbar'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faArrowDown, faArrowUp, faCloud, faEllipsisH, faTimes } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faEllipsisH, faTimes, faArrowUp, faArrowDown, faCloud, faGithub, faGoogle)

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path ="/home">
            <div className="App">
              <Menu/>
            </div>
            <DashBoard/>
          </Route>
          <Route exact path ="/auth">
            <Inscription/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

