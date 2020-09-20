import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loading from './components/shared/Loading';


const HomePage = lazy(() => import('./pages/HomePage'))

function App() {
  return (
    <Suspense fallback={<Loading />} >
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
