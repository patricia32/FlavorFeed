import './App.css';
import { Routes, Route } from 'react-router-dom';

import { MessageArea } from './components/MessageArea';
import { Layout } from './layouts/Layout';
import { MainPage } from './pages/MainPage';
import { RestaurantPage } from './pages/RestaurantPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/restaurants/:id" element={<RestaurantPage />} />
        <Route
          path="*"
          element={
            <MessageArea
              title="Page not found"
              content="The page you are looking for does not exist."
              showLoadingGif={true}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
