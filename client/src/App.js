import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
import MainPages from './components/pages/MainPage';
import Table from './components/pages/Table';
import Navbar from './components/pages/Navbar';
// import { delError } from './redux/actions/error';

function App() {
  // const dispatch = useDispatch();
  // const error = useSelector(state => state.err);
  // useEffect(() => {
  //   dispatch(delError());
  // })
  return (
    <>
      <Router>
        <Navbar/>
        {/* {error && <span className="error">{error}</span>} */}
        <Switch>
          <Route path="/table">
            <Table/>
          </Route>
          <Route path="/">
            <MainPages/>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
