import React, { Component } from 'react'; // Always going to import component from react
import axios from 'axios';

export default class CreateUsers extends Component {
    
    constructor(props) {
        super(props); //Always call super when defining a constructor of a subclass

         //Always want to know wha 'this' is refering too, needs to be referring to the class

         //'this' is always referring to the correct function
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      

        //Corresponds to the MongoDB requirements
        this.state = {
            username: ''
        }

    }

    onChangeUsername(e) {
        //Always want to know wha 'this' is refering too, needs to be referring to the class
        this.setState({
            username: e.target.value //The target = textbox and value = value of textbox
        });
    }

    onSubmit(e){
        e.preventDefault(); // Prevents normal HTML behavior
        
        const user = {
            username: this.state.username
            
        }

        console.log(user)

        axios.post('http://localhost:5000/users/add', user) //Sends request to backend endpoint --- Expecting the argument
        .then(res => console.log(res.data));

        this.setState({
            username: ''
        })
    }

    render() {
        return (
            <div>
            <h3>Create New User</h3>
            <form onSubmit={this.onSubmit}>
                <label>Username: </label>
                <input type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
                <div className="form-group">
                    <input type="submit" value="Create User" className="btn btn-primary"/>
                </div>


            </form>
            </div>
         

        )
    }
}