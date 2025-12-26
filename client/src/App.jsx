import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import GreetingCardPopup from './components/GreetingCardPopup'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import News from './pages/News'
import Forum from './pages/Forum'
import Donate from './pages/Donate'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import RegisterMember from './pages/RegisterMember'
import RegisterStudent from './pages/RegisterStudent'
import Login from './pages/Login'
import MemberDashboard from './pages/MemberDashboard'
import AdminMembers from './pages/AdminMembers'

function App() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Popup de carte de vœux - s'affiche une fois par jour */}
            <GreetingCardPopup />
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
                    <Route path="/admin" element={<Admin />} />
                    {/* Nouvelles routes d'inscription et connexion */}
                    <Route path="/inscription-membre" element={<RegisterMember />} />
                    <Route path="/inscription-etudiant" element={<RegisterStudent />} />
                    <Route path="/connexion" element={<Login />} />
                    <Route path="/espace-membre" element={<MemberDashboard />} />
                    <Route path="/admin-membres" element={<AdminMembers />} />
                </Routes>
            </main>
            <Footer />
        </div>
    )
}

export default App

