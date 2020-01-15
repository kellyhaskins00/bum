import React, { Component } from "react";
import Layout from "../Layout/Layout";
import { Route } from "react-router-dom";
// import AppointmentBuilder from "../../containers/AppointmentBuilder/AppointmentBuilder";
import ButtonBases from "../LandingPage/LandingPage";
import Surgeon from "../Surgeon/Surgeon";
import Admin from "../Admin/Admin";
// import Optometrist from "../Optometrist/Optometrist";
import EduPersonalization from "../Admin/EduPersonalization/EduPersonalization";
// import NewPatient from "../Admin/NewPatient/NewPatient";
import Scheduling from "../Admin/Scheduling/Scheduling";
import AddPatient from "../Admin/Forms/AddPatient";
import AllPatients from "../Admin/AllPatients/AllPatients";
import Scheduler from "../Patients/AppointmentBuilder/AppointmentBuilder";

class Navigation extends Component {
  render() {
    return (
      <>
        <Layout />
        <Route path="/" exact component={ButtonBases} />
        <Route path="/patient/appointments" component={Scheduler} />
        <Route path="/surgeon" component={Surgeon} />
        {/* <Route path="/optometrist" component={Optometrist} /> */}
        <Route path="/admin" component={Admin} />
        <Route path="/admin/all-patients" component={AllPatients} />
        <Route path="/admin/education" component={EduPersonalization} />
        <Route path="/admin/scheduling" component={Scheduling} />
        <Route path="/admin/forms/addPatients" component={AddPatient} />
      </>
    );
  }
}

export default Navigation;