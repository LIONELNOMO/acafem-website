import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import News from './pages/News'
import Forum from './pages/Forum'
import Donate from './pages/Donate'
import Contact from './pages/Contact'

function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/a-propos" element={<About />} />
                    <Route path="/projets" element={<Projects />} />
                    <Route path="/actualites" element={<News />} />
                    <Route path="/forum" element={<Forum />} />
                    <Route path="/don" element={<Donate />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </main>
            <Footer />
        </div>
    )
}

export default App
