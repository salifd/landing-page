import Header from './components/Header';
import FirstSection from './components/FirstSection';
import SecondSection from './components/SecondSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <FirstSection />
        <SecondSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
