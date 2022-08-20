import * as React from 'react';
import { Routes, Route, Link, Outlet, useLocation } from 'react-router-dom';
import './App.css';
import TourList from './components/TourList.js'
import TourDetail from './components/TourDetail.js';

function Layout() {
  return (
    <>
      <div className="header">
        <nav>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/faq">FAQ</Link>
          </li>
          <li>
            <Link to="/tour">Tour</Link>
          </li>
        </nav>
      </div>
      <main>
        <Outlet />
      </main>
      <div className="footer">Footer</div>
    </>
  );
}

function Home() {
  return (
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
    </>
  );
}

function About() {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>That feels like an existential question, don't you think?</p>
      </main>
    </>
  );
}

function FAQ() {
  return (
    <>
      <main>
        <h2>FAQ</h2>
        <p>QAQ</p>
      </main>
    </>
  );
}

function Tour() {
  return (
    <>
      <h2>Tour Page</h2>
      <main>
        <Outlet />
      </main>
    </>
  );
}

function NotFound () {
  return (
    <>
      <main>
        <p>Nothing in here !</p>
      </main>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <h1>Welcome to Kaohsiung Travel !</h1>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="tour" element={<Tour />}>
            <Route
              index
              element={<TourList />}
              state={{ search: '', page: [], targetPage: 1 }}
            />
            <Route path=":Id" element={<TourDetail />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
