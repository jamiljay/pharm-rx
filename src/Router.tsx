import { Routes, Route } from 'react-router-dom';

import App from './App';
import Home from './views/Home';
import Pharmacy from './views/Pharmacy';

const Router = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/pharmacy" element={<Pharmacy />} />
    </Route>
  </Routes>
);

export default Router;
