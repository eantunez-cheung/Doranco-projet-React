import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./routes/Home/Home.jsx";
import Recipe from "./routes/Recipe/Recipe.jsx";
import Splash from "./routes/splash/Splash";
import Favorite from "./routes/favorite/Favorite.jsx";
import AddRecipe from "./routes/addRecipe/AddRecipe.jsx";
import Profile from "./routes/profile/Profile";
import { useState } from "react";

function App() {
  const [isConnected, setIsConnected] = useState(false)
  const [form, setForm] = useState('')
  const [user, setUser] = useState('')

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/Accueil" render={() => <Home connected={{isConnected: isConnected, setIsConnected}} user={{user: user, setUser}} form={{form: form, setForm}} />} />
          <Route exact path="/Recette/:id" render={(props) => <Recipe {...props} isConnected={isConnected} form={{form: form, setForm}} />} />
          <Route exact path="/" render={() => <Splash />} />
          <Route exact path="/Favoris" render={() => <Favorite isConnected={isConnected} user={user} />} />
          <Route exact path="/Ajouter" render={() => <AddRecipe isConnected={isConnected} user={user} />} />
          <Route exact path="/Profil" render={() => <Profile isConnected={isConnected} user={user} />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
