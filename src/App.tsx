import { Helmet } from 'react-helmet-async';
import Header from './components/Header';
import FirstSection from './components/FirstSection';
import SecondSection from './components/SecondSection';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Helmet>
        <title>Quikku - The Future of Payment for Travellers</title>
        <meta
          name="description"
          content="Reimagining how the world moves. Join us on our journey to design innovative payment solutions for global travelers. Be the first to embark with Quikku."
        />
        <link rel="canonical" href="https://www.quikkupay.com/" />
      </Helmet>

      <div className="min-h-screen bg-[#000d2e]">
        <Header />
        <main id="main-content">
          <FirstSection />
          <SecondSection />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
