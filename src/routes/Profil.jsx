import NavBar from '../components/navBar/NavBar.jsx';
export default function Accueil ({isConnected}) {
    return (
        <div>
            <h3>Page du profil</h3>
            <NavBar activeMenu="profile" isConnected={isConnected} />
        </div>
    )
}