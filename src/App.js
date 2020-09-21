import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loading from './components/shared/Loading';
import ErrorPage from './pages/ErrorPage';

const HomePage = lazy(() => import('./pages/HomePage'))

function App() {

  return (
    <Suspense fallback={<Loading />} >
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/error" component={ErrorPage} />
      </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
