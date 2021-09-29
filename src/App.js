import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Accueil from "./routes/Home/Accueil.jsx";
import Recette from "./routes/Recipe/Recette.jsx";
import Splash from "./routes/Splash.jsx";
import Favoris from "./routes/Favoris.jsx";
import Ajouter from "./routes/addRecipe/Ajouter.jsx";
import Profil from "./routes/Profil.jsx";
import { useState } from "react";

function App() {
  const [isConnected, setIsConnected] = useState(false)
  const [user, setUser] = useState('')

  console.log(user)

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/Accueil" render={() => <Accueil connected={{isConnected: isConnected, setIsConnected}} setUser={setUser} />} />
          <Route exact path="/Recette/:id" render={(props) => <Recette {...props} isConnected={isConnected} />} />
          <Route exact path="/" render={() => <Splash />} />
          <Route exact path="/Favoris" render={() => <Favoris isConnected={isConnected} />} />
          <Route exact path="/Ajouter" render={() => <Ajouter isConnected={isConnected} />} />
          <Route exact path="/Profil" render={() => <Profil isConnected={isConnected} />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
