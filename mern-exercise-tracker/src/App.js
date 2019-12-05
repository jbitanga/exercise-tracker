import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom"; //This routes URLs to different react components
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/exercises-list.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";


//This JSX is being retured from index.js
function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component = {ExercisesList} />
      <Route path="/edit/:id" component = {EditExercise} />
      <Route path="/create" component = {CreateExercise} />
      <Route path="/user" component = {CreateUser} />

    
      
    </div>
    </Router>
  );
}

export default App;
