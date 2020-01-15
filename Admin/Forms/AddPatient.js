import React, { Component } from 'react'
import axios from 'axios';

class AddPatient extends Component {
    state = {
        firstName: '',
        lastName: '',
        phoneNumber: ''
    }

    handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({
          [name]: value
        });
      };
    
      resetUserInputs = () => {
        this.setState({
          firstName: "",
          lastName: "",
          phoneNumber: ""
        });
      };

      handleSubmit = event => {
        event.preventDefault();
        this.resetUserInputs();
        const payload = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          phoneNumber: this.state.phoneNumber
        };
    
        axios
          .post("/api/addPatients", payload)
          .then(res => {
            console.log("Data has been saved " + res.data);
          })
          .catch(err => console.log(err.response));
      };


render() {
    return (
        <>
 <div style={{ marginLeft: "250px", marginTop: "25px" }}>
          
          <form onSubmit={this.handleSubmit}>
            <div>
              <input
                type="text"
                name="firstName"
                value={this.state.firstName}
                placeholder="First Name"
                onChange={this.handleChange}
              ></input>
              <input
                type="text"
                name="lastName"
                value={this.state.lastName}
                placeholder="Last Name"
                onChange={this.handleChange}
              ></input>
              <input
                type="text"
                name="phoneNumber"
                value={this.state.phoneNumber}
                placeholder="Phone Number"
                onChange={this.handleChange}
              ></input>
              <button>Sumbit</button>
            </div>
          </form>
        </div>

        </>
    )
}
}

export default AddPatient;