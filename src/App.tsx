import Header from './components/Header';
import FirstSection from './components/FirstSection';
import SecondSection from './components/SecondSection';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <FirstSection />
        <SecondSection />
      </main>
    </div>
  );
}

export default App;
