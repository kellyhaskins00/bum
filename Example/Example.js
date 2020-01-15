import React, {Component} from 'react';
import Modal from 'react-modal';
import styles from '../Patients/AppointmentBuilder/Appointment.module.css';
import image from "../../assets/images/screenShot.png";

class Example extends Component {
    state = {
        modalIsOpen: false
    }

    openModal = () => {
        this.setState({
            modalIsOpen: true
        })
    }

    closeModal = () => {
        this.setState({
            modalIsOpen: false
        })
    }

    render() {

        return (

            <>
                <button
                    style={{ margin: "55px 0 0 305px"}}
                    onClick={this.openModal}
                  >
                    View Example
                  </button>
                <Modal
                    className={styles.Modal}
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="My modal"
                  >
                  <div>
                  <img alt="example" src={image} />
                  </div>
                   
                  </Modal>
           
                
            </>

        );



    }


}


export default Example;