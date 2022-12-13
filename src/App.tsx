import React, { Suspense } from 'react';
import Navbar from './components/Navbar';
import './App.css';
import LoadinPage from './pages/LoadingPage';

function App() {
  const Router = React.lazy(() => import("./components/Router"));
  return (
    <div>
      <Navbar />
      <Suspense fallback={<LoadinPage />}>
        <Router />
      </Suspense>
    </div>
  );
}

export default App;
