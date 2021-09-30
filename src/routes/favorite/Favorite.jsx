import NavBar from '../../components/navBar/NavBar.jsx';
export default function Favorite ({isConnected}) {
    return (
        <div>
            <h3>Page des favoris</h3>
            <NavBar activeMenu="favorite" isConnected={isConnected} />
        </div>
    )
}