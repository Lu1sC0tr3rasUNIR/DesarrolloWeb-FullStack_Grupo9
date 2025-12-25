import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Pay from './pages/Pay';
import Components from './pages/Components';
import Book from './pages/Book';
import CheckOut from './pages/CheckOut';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/book/:isbn" element={<Book />} />
          <Route path="/components" element={<Components />} />
          <Route path="/checkout" element={<CheckOut />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
