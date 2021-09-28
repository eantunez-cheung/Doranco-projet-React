import NavBar from '../../components/NavBar.jsx';
export default function Ajouter ({isConnected}) {
    return (
        <div>
            <h3>Page d'ajout de recette</h3>
            <NavBar activeMenu="ajouter" isConnected={isConnected} />
        </div>
    )
}