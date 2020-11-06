import React from 'react';
import './App.css';
import Login from './components/auth/Login';
import Newsfeed from './components/home/Newsfeed';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Protected from './components/Protected';
import TimeLine from './components/timeline/TimeLine';
import Timeabout from './components/timeline/Timeabout';
import TimelAlbum from './components/timeline/TimelAlbum';
import ChangePassword from './components/editprofile/ChangePassword';
import PageChat from './components/chatbox/PageChat';
function App() {

  return (
      <Router>
        <div> 
          <Switch> 
            <Route exact path="/" component={Login}/>
            <Route  exact path="/timeline" ><Protected  component={TimeLine}/></Route>
            <Route  path="/changepassword" ><Protected  component={ChangePassword}/></Route>
            <Route  path="/timeline-about" ><Protected  component={Timeabout}/></Route>
            <Route  path="/timeline-album" ><Protected  component={TimelAlbum}/></Route>
            <Route  path="/pageChat" ><Protected  component={PageChat}/></Route>
            <Route  path="/newsfeed"><Protected  component={Newsfeed}/> </Route>
          </Switch>
        </div>
      </Router>
  );
}

export default App;
