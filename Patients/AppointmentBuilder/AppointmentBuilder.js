import React, { Component } from "react";
import {
    Stitch,
    AnonymousCredential,
    RemoteMongoClient
  } from "mongodb-stitch-browser-sdk";
import axios from "axios";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Check from "@material-ui/icons/Check";
import "react-day-picker/lib/style.css";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Step,
  StepLabel,
  Stepper,
  StepConnector,
  StepButton,
  StepContent,
  TextField,
  Radio
} from "@material-ui/core";
import DayPicker from "react-day-picker";
import Modal from "react-modal";
import styles from "../AppointmentBuilder/Appointment.module.css"; //Kelly's CSS Stylesheet changes added to this Stylesheet
import PatientEdu from "../../Admin/PatientEdu/PatientEdu";
import { Wrapper } from "@material-ui/pickers/wrappers/Wrapper";
dayjs.extend(advancedFormat);
Modal.setAppElement("#root");

function CustomOverlay({ classNames, selectedDay, children, ...props }) {
  return (
    <div
      className={classNames.overlayWrapper}
      style={{
        margin: "auto",
        minHeight: "250px",
        zIndex: "1500"
      }}
      {...props}
    >
      <div>
        <div className={styles["CalToolbar"]}>
          <div className={styles["CalYear"]}>{dayjs().get("year")}</div>
          <div className={styles["CalSelected"]}>
            {dayjs()
              .startOf("day")
              .format("ddd, MMM YYYY")}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

CustomOverlay.propTypes = {
  classNames: PropTypes.object.isRequired,
  selectedDay: PropTypes.instanceOf(Date),
  children: PropTypes.node.isRequired
};

const QontoConnector = withStyles({
  active: {
    "& $line": {
      borderColor: "#126380"
    }
  },
  completed: {
    "& $line": {
      borderColor: "#126380"
    }
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1
  }
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center"
  },
  active: {
    color: "#126380"
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor"
  },
  completed: {
    color: "#126380",
    zIndex: 1,
    fontSize: 18,
    marginLeft: "-4px"
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  button: {
    marginRight: theme.spacing(1),
    margin: "auto"
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  nextButton: {
    "&:hover": {
      backgroundColor: "#126380"
    },
    backgroundColor: "#1881a7",
    color: "white"
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: "none",
    padding: theme.spacing(2, 4, 3)
  }
}));

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

export default class AppointmentBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      smallScreen: window.innerWidth < 768,
      selectedDay: undefined,
      isEmpty: true,
      isDisabled: false,
      formattedDate: undefined,
      loading: true,
      selectedIndex: 1,
      open: false,
      setOpen: false,
      confirmationTextVisible: false,
      secondModal: false,
      modalIsOpen: false,
      stepIndex: 0,
      checked: false,
      activeStep: 0,
      setActiveStep: 0,
      location: "1229 Madison St, Suite 1250, Seattle, WA 98104",
      clinicPhone: "(800)340-3595"
    };

    this.handleDayClick = this.handleDayClick.bind(this);
    this.openModal = this.openModal.bind(this);

    this.closeModal = this.closeModal.bind(this);
    this.handleNextStep = this.handleNextStep.bind(this);
    this.addAppointment = this.addAppointment.bind(this);
    this.anchorRef = React.createRef();
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.closeSecondModal = this.closeSecondModal.bind(this);
    this.handleParseHandler = this.handleParseHandler.bind(this);

    this.handleNext = this.handleNext.bind(this);
  }

  handleNext = () => {
    this.setState({ setActiveStep: this.state.setActiveStep + 1 });
  };

  handleNextStep() {
    const { stepIndex } = this.state;
    return stepIndex < 4 ? this.setState({ stepIndex: stepIndex + 1 }) : null;
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleClose() {
    this.setState({ setOpen: false, open: false });
  }

  //APPOINTMENT SLOT PICKER
  onChange(time, event) {
    let slots = event.target.value;
    this.setState({ appointmentSlot: slots });
    console.log(slots);
  }

  handleDayClick(day, modifiers = {}) {
    if (modifiers.disabled) {
      return;
    }
    this.setState({ selectedDay: modifiers.selected ? undefined : day });
    this.setState({ confirmationTextVisible: true });
  }

  handleOpen() {
    this.setState({ setOpen: true });
  }

  handleSlotChange(event, val) {
    this.setState({ appointmentSlot: val });
    this.setState({ time: event.target.value });
  }

  handleParseHandler() {
    let parsedNumber = `+1${this.state.phone}`;
    this.setState({ phone: parsedNumber });
  }

  renderConfirmationString() {
    const spanStyle = { color: "#1881a7" };
    return this.state.confirmationTextVisible ? (
      <h2
        style={{
          textAlign: this.state.smallScreen ? "center" : "left",
          color: "#bdbdbd",
          lineHeight: 1.5,
          padding: "0 10px",
          fontFamily: "inherit",
          fontWeight: 300
        }}
      >
        {
          <span>
            Scheduling your appointment{"  "}
            {this.state.selectedDay && (
              <span>
                on{" "}
                <span style={spanStyle}>
                  {dayjs(this.state.selectedDay).format("dddd[,] MMMM Do")}
                </span>
              </span>
            )}{" "}
            {this.state.appointmentSlot && (
              <span>
                at <span style={spanStyle}>{this.state.appointmentSlot}</span>
              </span>
            )}
            {"."}
          </span>
        }
      </h2>
    ) : null;
  }

  validateEmail(email) {
    const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return regex.test(email)
      ? this.setState({ email: email, validEmail: true })
      : this.setState({ validEmail: false });
  }

  validatePhone(event, phoneNumber) {
    const regex = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/;
    this.setState({ phone: event.target.value });
    return regex.test(phoneNumber)
      ? this.setState({ phone: phoneNumber, validPhone: true })
      : this.setState({ validPhone: false });
  }

  openSecondModal() {
    this.setState({ secondModal: true });
  }

  closeSecondModal() {
    this.setState({ secondModal: false });
    window.location.reload();
  }

  renderAppointmentTimes() {
    if (this.state.loading) {
      const slots = [...Array(8).keys()];
      return slots.map((slot, time) => {
        const t1 = dayjs()
          .hour(9)
          .minute(0)
          .add(slot, "hours");
        const t2 = dayjs()
          .hour(9)
          .minute(0)
          .add(slot + 1, "hours");
        return (
          <FormControlLabel
            control={
              <Radio
                name="slots"
                color="default"
                onChange={this.onChange.bind(this, time)}
              />
            }
            label={t1.format("h:mm a") + " - " + t2.format("h:mm a")}
            key={slot}
            name="radio slots"
            value={t1.format("h:mm a")}
          />
        );
      });
    }
  }

  renderAppointmentConfirmation() {
    const spanStyle = { color: "#1881a7" };
    return (
      <section>
        <p>
          Name:{" "}
          <span style={spanStyle}>
            {this.state.firstName} {this.state.lastName}
          </span>
        </p>
        <p>
          Number: <span style={spanStyle}>{this.state.phone}</span>
        </p>
        <p>
          Email: <span style={spanStyle}>{this.state.email}</span>
        </p>
        <p>
          Appointment:{" "}
          <span style={spanStyle}>
            {dayjs(this.state.selectedDay).format("dddd[,] MMMM Do[,] YYYY")}
          </span>{" "}
          at <span style={spanStyle}>{this.state.appointmentSlot}</span>
        </p>
        <p>
          Location: <span style={spanStyle}>{this.state.location}</span>
        </p>
        <p>
          Clinic Phone: <span style={spanStyle}>{this.state.clinicPhone}</span>
        </p>
      </section>
    );
  }

  addAppointment = event => {
    event.preventDefault();
    let datePicked = this.state.selectedDay;
    let pickedDay = dayjs(datePicked).format("dddd MMM Do, YYYY");

    const confirmation = {
      owner_id: this.client.auth.user.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      date: pickedDay,
      slot: this.state.appointmentSlot,
      location: this.state.location,
      phone: this.state.phone
    };


    this.db
    .collection("appointments")
    .insertOne(confirmation)
    .then(result =>
      console.log(
        `Successfully inserted item with _id: ${result.insertedIds} and the appointment date is ${confirmation.location}`
      )
    )
    .catch(err => console.error(`Failed to insert item: ${err}`))
    .then(this.handleClose)
    .then(
      window.setTimeout(() => {
        this.openSecondModal();
      }, 3000)
    );
  };

  componentDidMount() {
    // Initialize the App Client
    this.client = Stitch.initializeDefaultAppClient(
      "appointmentscheduler-racyu"
    );

    Stitch.defaultAppClient.auth
      .loginWithCredential(new AnonymousCredential())
      .then(user => {
        console.log(`Logged in as anonymous user with id: ${user.id}`);
      })
      .catch(console.error);
    // Get a MongoDB Service Client, used for logging in and communicating with Stitch
    const mongodb = this.client.getServiceClient(
      RemoteMongoClient.factory,
      "mongodb-atlas"
    );
    // Get a reference to the new appointments database
    this.db = mongodb.db("NEXUS");
  }




  resize() {
    this.setState({ smallScreen: window.innerWidth < 768 });
  }

  render() {
    const {
      stepIndex,
      smallScreen,
      loading,
      selectedDay,
      isDisabled,
      isEmpty,
      activeStep,
      setActiveStep,
      ...data
    } = this.state;

    return (
      <>
        <section
          style={{
            maxWidth: !smallScreen ? "80%" : "100%",
            margin: "auto",
            marginTop: !smallScreen ? 20 : 0
          }}
        >
          {this.renderConfirmationString()}

          <Card
            style={{
              marginTop: "20px",
              padding: "10px 10px 25px 10px",
              height: smallScreen ? "100vh" : null
            }}
          >
            <Stepper
              activeStep={stepIndex}
              orientation="vertical"
              connector={<QontoConnector />}
            >
              <Step disabled={loading}>
                <StepLabel
                  StepIconComponent={QontoStepIcon}
                  onClick={() => this.setState({ stepIndex: 0 })}
                >
                  Choose an available day for your appointment
                </StepLabel>

                <StepContent>
                  {/* Adding the date picker here ****************************************** */}
                  <button
                    id="DateButton"
                    className={styles["DateButton"]}
                    onClick={this.openModal}
                  >
                    Select a day
                  </button>
                  <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="My modal"
                    className={styles["Modal"]}
                    overlayClassName={styles["Overlay"]}
                  >
                    <DayPicker
                      mode={smallScreen ? "portrait" : "landscape"}
                      label="Select a date"
                      onDayClick={this.handleDayClick}
                      selectedDays={this.state.selectedDay}
                      disabledDays={{ daysOfWeek: [0, 6] }}
                      value={data.appointmentDate}
                    />
                    <div
                      style={{
                        flex: "0 0 auto",
                        display: "flex",
                        padding: "8px",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        marginTop: "20px"
                      }}
                    >
                      <button
                        className={styles["ButtonCal"]}
                        onClick={this.closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        className={styles["ButtonCal"]}
                        onClick={this.closeModal}
                      >
                        OK
                      </button>
                    </div>
                  </Modal>
                  <Button
                    className={styles["nextButton"]}
                    onClick={this.handleNextStep}
                    variant="contained"
                  >
                    Next
                  </Button>
                </StepContent>
              </Step>
              <Step disabled={!data.appointmentDate}>
                <StepLabel
                  StepIconComponent={QontoStepIcon}
                  onClick={() => this.setState({ stepIndex: 1 })}
                >
                  Choose an available time for your appointment
                </StepLabel>
                <StepContent>
                  <FormControl>
                    <FormLabel component="legend" style={{ color: "#1881a7" }}>
                      Select Available Appointment Times
                    </FormLabel>
                    {this.renderAppointmentTimes()}
                    <Button onClick={() => this.setState({ stepIndex: 0 })}>
                      Back
                    </Button>
                    <Button
                      className={styles["nextButton"]}
                      style={{ marginTop: "10px" }}
                      onClick={this.handleNextStep}
                      variant="contained"
                    >
                      Next
                    </Button>
                  </FormControl>
                </StepContent>
              </Step>

              <Step disabled={!data.appointmentDate}>
                <StepLabel
                  StepIconComponent={QontoStepIcon}
                  onClick={() => this.setState({ stepIndex: 2 })}
                >
                  Share your contact information with us and we'll send you a
                  reminder
                </StepLabel>
                <StepContent
                  style={{
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <TextField
                    style={{ display: "block" }}
                    name="first_name"
                    label="First Name"
                    fullWidth
                    onChange={newValue =>
                      this.setState({ firstName: newValue.target.value })
                    }
                  />
                  <TextField
                    style={{ display: "block" }}
                    name="last_name"
                    label="Last Name"
                    fullWidth
                    onChange={newValue =>
                      this.setState({ lastName: newValue.target.value })
                    }
                  />
                  <TextField
                    style={{ display: "block" }}
                    name="email"
                    fullWidth
                    label="name@mail.com (optional)"
                    onClick={() =>
                      this.setState({
                        confirmationModalOpen: !this.state.confirmationModalOpen
                      })
                    }
                    onChange={newValue =>
                      this.validateEmail(newValue.target.value)
                    }
                  />
                  <TextField
                    style={{ display: "block" }}
                    name="phone"
                    label="(888) 888-8888"
                    fullWidth
                    onChange={newValue => this.validatePhone(newValue)}
                    onChangeCapture={this.handleParseHandler}
                  />
                  <Button
                    style={{ marginTop: "20px" }}
                    className={styles["nextButton"]}
                    variant="contained"
                    fullWidth
                    onClick={() => this.setState({ open: true })}
                  >
                    Schedule
                  </Button>
                  <Button
                    fullWidth
                    style={{ marginTop: "10px" }}
                    onClick={() => this.setState({ stepIndex: 1 })}
                  >
                    Back
                  </Button>
                </StepContent>
              </Step>
            </Stepper>
          </Card>

          <form onSubmit={this.addAppointment}>
            <Dialog
              open={this.state.open}
              onClose={this.openSecondModal}
              ref={this.modalOneRef}
            >
              <DialogTitle id="alert-dialog-title">
                Confirm your appointment?
              </DialogTitle>
              <DialogContent>
                {this.renderAppointmentConfirmation()}
                <DialogContentText id="alert-dialog-description" />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose}>Cancel</Button>
                <Button
                  onClick={this.addAppointment}
                  variant="contained"
                  className={styles["nextButton"]}
                >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </form>
          <PatientEdu />
        </section>
        <Dialog open={this.state.secondModal} onClose={this.handleClose}>
          <DialogTitle>Your appointment has been confirmed!</DialogTitle>
          <DialogContent>
            <Button
              onClick={this.closeSecondModal}
              className={styles["nextButton"]}
              variant="contained"
              style={{
                textAlign: "center",
                margin: "auto",
                display: "flex"
              }}
            >
              OK
            </Button>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}
