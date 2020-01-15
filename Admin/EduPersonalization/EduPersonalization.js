import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Example from '../../Example/Example';
import styles from './EduPersonalization.module.css'


class EduPersonalization extends Component {
    state = {
        heading: '',
        mission: '',
        src: '',
        why: '',
        expectation: '',
        payment: '',
        next: '',
        isClicked: false,
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


    

    changeHandler = ({ target }) => {
        const { name, value } = target;
        this.setState({
          [name]: value
        });
    }

    resetUserInputs = () => {
        this.setState({
            heading: '',
            mission: '',
            src: '',
            why: '',
            expectation: '',
            payment: '',
            next: ''
        });
      };

    handleSubmit = event => {
        event.preventDefault();
        this.resetUserInputs();
        const payload = {
            heading: this.state.heading,
            mission: this.state.mission,
            src: this.state.src,
            why: this.state.why,
            expectation: this.state.expectation,
            payment: this.state.payment,
            next: this.state.next,
        };
    
        axios
          .post("/api/education", payload)
          .then(res => {
            console.log("Data has been saved " + res.data);
          })
          .catch(err => console.log(err.response));
      };

      display = event => {
        event.preventDefault();
       
        this.setState({
          heading: this.state.heading,
          mission: this.state.mission,
          src: this.state.src,
          why: this.state.why,
          expectation: this.state.expectation,
          payment: this.state.payment,
          next: this.state.next,
          isClicked: true
        });
        console.log(this.state);
      }





    render() {
        return (
            <>
            <Example />
            <br />
            <br />
            <div style={{ marginLeft: "25px"}}>
              <form className={styles.Form} style={{marginRight:'-250px', marginTop:'-5px'}} onSubmit={this.handleSubmit}>
                    <input type="text" name="heading" value={this.state.heading} onChange={this.changeHandler} placeholder="Heading" />
                    <br/>
                    <input type="text" name="mission" value={this.state.mission} onChange={this.changeHandler} placeholder="Mission" />
                    <br/>
                    <input type="text" name="src" value={this.state.src} onChange={this.changeHandler} placeholder="Embedded URL" />
                    <br/>
                    <input type="text" name="why" value={this.state.why} onChange={this.changeHandler} placeholder="Why" />
                    <br/>
                    <input type="text" name="expectation" value={this.state.expectation} onChange={this.changeHandler} placeholder="Expectations" />
                    <br/>
                    <input type="text" name="payment" value={this.state.payment} onChange={this.changeHandler} placeholder="Payment" />
                    <br/>
                    <input type="text" name="next" value={this.state.next} onChange={this.changeHandler} placeholder="Next Steps" />
                    
                </form>
<>
                <button style={{ marginLeft: "310px", marginTop:'15px'}} 
            onClick={this.display}
            
          /*to make the display window exit*/
          // onClick={this.openModal}

            type="submit">
            Display
          </button>

          <Modal
                    className={styles.Modal}
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="My modal"
                  >   
                  </Modal>

</>

                {this.state.isClicked && (
          <div className={styles.Render}>
            <h3>{this.state.isClicked && this.state.heading}</h3>
            <p>{this.state.isClicked && this.state.mission}</p>
            <div>
              {this.state.isClicked && (
                <iframe
                  allow="accelerometer; autoplay; encrypted-media; gyroscope: picture-in-picture"
                  allowFullScreen
                  frameBorder="0"
                  title="video"
                  width="400"
                  height="300"
                  src={this.state.src}
                ></iframe>
              )}
            </div>
            <h3>{this.state.why}</h3>
            <p>{this.state.expectation}</p>
            <p>{this.state.payment}</p>
            <p>{this.state.next}</p>
            <button style={{width: "100px", margin: "auto", marginBottom: "40px"}} type="submit" onClick={this.onSubmit}>
              Save Changes
            </button>
          </div>
        )}
                
                <br/>
     
       </div>
            </>
        )
    }



}

export default EduPersonalization;

