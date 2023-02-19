import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from "./components/Spots";
import SpotDetails from "./components/SpotDetails";
import CreateSpot from "./components/NewSpot";
import UserSpot from './components/UserSpot'
import UpdateSpot from "./components/UpdateSpot";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <Spots />
          </Route>
          <Route path='/spots/new'>
            <CreateSpot />
          </Route>
          <Route path='/spots/current'>
            <UserSpot />
          </Route>
          <Route exact path='/spots/:spotId'>
            <SpotDetails />
          </Route>
          <Route exact path="/spots/:spotId/edit">
            <UpdateSpot />
          </Route>
          <Route>
            Page Not Found
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
