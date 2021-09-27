import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Accueil from "./routes/Accueil.jsx";
import Recette from "./routes/Recette.jsx";
import Splash from "./routes/Splash.jsx";
import Favoris from "./routes/Favoris.jsx";
import Ajouter from "./routes/Ajouter.jsx";
import Profil from "./routes/Profil.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/Accueil" render={() => <Accueil />} />
          <Route exact path="/Recette/:id" component={Recette} />
          <Route exact path="/" render={() => <Splash />} />
          <Route exact path="/Favoris" render={() => <Favoris />} />
          <Route exact path="/Ajouter" render={() => <Ajouter />} />
          <Route exact path="/Profil" render={() => <Profil />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
