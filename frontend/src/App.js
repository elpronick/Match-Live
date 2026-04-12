import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import DeckSection from './components/DeckSection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app" data-testid="app-container">
      <Header />
      <Hero />
      <HowItWorks />
      <DeckSection />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;
