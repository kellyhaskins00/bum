import React, { Component } from "react";
import axios from "axios";

class AllPatients extends Component {
  state = {
    patients: [],
    isLoaded: false
  };

  getPatients = () => {
    axios
      .get("/api/addPatients")
      .then(response => {
        const data = response.data;
        console.log(data);
        this.setState({
          patients: data,
          isLoaded: true
        });
        console.log("data has been received");
        console.log(this.state.patients);
      })
      .catch(err => {
        alert("Error retrieving data");
      });
  };

  componentDidMount = () => {
    this.getPatients();
  };

  render() {
    const { patients, isLoaded } = this.state;
    const patientArray = patients.map(patient => (
      <div key={patient._id}>
        <h3>
          {patient.firstName} {patient.lastName}
        </h3>
        <h5>{patient.phoneNumber}</h5>
      </div>
    ));

    if (!isLoaded) {
      return <div>Loading...</div>;
    }

    console.log("State: ", this.state);
    return (
      <>
       
        <div style={{ marginLeft: "275px"}}>
            <h3>All Patients</h3>
             
          <div>{patientArray}</div>
        </div>

      </>
    );
  }
}

export default AllPatients;