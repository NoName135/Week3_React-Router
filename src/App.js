import * as React from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import TourList from './components/TourList.js';
import TourDetail from './components/TourDetail.js';


function Layout() {
  const [isNavCollapsed, setIsNavCollapsed] = React.useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <div className="container-fluid bg-light text-center container-height100">
      <div className="mainArea">
        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary mb-3">
          <Link to="/" className="navbar-brand px-5">
            Kaohsiung Travel
          </Link>
          <button
            className="navbar-toggler me-3"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded={!isNavCollapsed ? true : false}
            aria-label="Toggle navigation"
            onClick={handleNavCollapse}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}
            id="navbarNav"
          >
            <ul className="navbar-nav ms-auto me-lg-5">
              <li className="nav-item pe-lg-5">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item pe-lg-5">
                <Link to="/about" className="nav-link">
                  About
                </Link>
              </li>
              <li className="nav-item pe-lg-5">
                <Link to="/FAQ" className="nav-link">
                  FAQ
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Tour" className="nav-link">
                  Tour
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <main className="container">
          <Outlet />
        </main>
      </div>

      <footer className="mt-auto bg-secondary text-white py-3">
        Copyright© 2022 Ezekiel Lin. All Rights Reserved.
      </footer>
    </div>
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
        <p>
          A Frequently Asked Question (FAQ) page contains a list of questions
          and answers pertaining to a particular topic.
        </p>
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
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="tour" element={<Tour />}>
            <Route index element={<TourList />} />
            <Route path=":Id" element={<TourDetail />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
