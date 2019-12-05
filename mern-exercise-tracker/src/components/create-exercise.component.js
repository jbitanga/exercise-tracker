//This component allows us to insert exercises into the database
import React, { Component } from 'react'; // Always going to import component from react
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercises extends Component {

    constructor(props) {
        super(props); //Always call super when defining a constructor of a subclass

         //Always want to know wha 'this' is refering too, needs to be referring to the class

         //'this' is always referring to the correct function
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //Corresponds to the MongoDB requirements
        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }

    }

    //React lifecycle method will automatically call at different points - will automatically be called before anything displays on the page
    componentDidMount() {
       axios.get('http://localhost:5000/users/')
       .then(response => {
           if (response.data.length > 0) { //Checks if there is at least 1 user
               this.setState({
                   users: response.data.map(user => user.username), //Data is the array - > Maps the array and returns something for each something in the array
                   username: response.data[0].username
               })
           }
       })

    }

    //Update state properties NOTE *Always want to use the set state property
    onChangeUsername(e) {
        //Always want to know wha 'this' is refering too, needs to be referring to the class
        this.setState({
            username: e.target.value //The target = textbox and value = value of textbox
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value //The target = textbox and value = value of textbox
        });
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value //The target = textbox and value = value of textbox
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e){
        e.preventDefault(); // Prevents normal HTML behavior
        
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise)

        axios.post('http://localhost:5000/exercises/add', exercise) //Sends request to backend endpoint --- Expecting the argument
        .then(res => console.log(res.data));

        window.location = '/'; //Changes location after function is run
    }
    

    render() {
        return (
            <div>
              <h3>Create New Exercise Log</h3> 
              <form onSubmit={this.onSubmit}>
              <div className="form-group">
              <label>Username: </label>
              <select ref="userInput" 
              required
              className="form-control"
              value={this.state.username} 
              onChange={this.onChangeUsername}>
                 
              {
                  this.state.users.map(function(user){
                      return<option
                      key={user}
                      value={user}>{user}


                      </option>;
                  })
              }    
              </select>
              </div>
              <div className="form-group">
                  <label>Description: </label>
                  <input
                  type="text"
                  className="form-control"
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  />
              </div>
              <div className="form-group">
                  <label>Duration: </label>
                  <input
                  type="text"
                  className="form-control"
                  value={this.state.duration}
                  onChange={this.onChangeDuration}
                  />
              </div>
              <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>
              <div className="form-group">
                  <input type="submit" value="Create Exercise Log" className="btn btn-primary"></input>
              </div>
              </form>
            </div>
         

        )
    }
}