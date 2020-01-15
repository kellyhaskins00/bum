import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import calendar from '../../assets/images/calendar.png';

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ArrowIcon from "@material-ui/icons/ArrowRightAltSharp";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import eyeCheck from "../../assets/images/Eyecheck.jpg";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDropbox } from "@fortawesome/free-brands-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { TextField } from "@material-ui/core";
import PDF from '../../assets/RetmarkerDemo1.pdf';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Scheduling from '../Admin/Scheduling/Scheduling';



library.add(fab, faCircle, faDropbox);

const useStyles = makeStyles(theme => ({
  root: {
    width: "90%",
    marginTop: 20,
    margin: "auto"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    textAlign: "center"
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20
  },
  details: {
    alignItems: "center"
  },
  column: {
    flexBasis: "25%"
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2)
  },
  link: {
    color: "inherit",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
      "&:visited": {
        textDecoration: "none"
      }
    }
  }
}));

export default function DetailedExpansionPanel() {
  const handleVisibility = () => {
    let report = document.getElementById("report");

    report.style.display = report.style.display === "none" ? "" : "none";
  };

  const handleFundusVisibility = () => {
    let report = document.getElementById("fundus");

    report.style.display = report.style.display === "none" ? "" : "none";
  };
  const classes = useStyles();

  // const handleParseHandler = () => {
  //   let parsedNumber = `+1${this.state.phone}`;
  //   this.setState({ phone: parsedNumber });
  // };

  function createData(name, record) {
    return { name, record };
  }

  const rows = [
    createData('Davis, Sophia', )
  ]



  const addPatient = event => {
    event.preventDefault();
    alert(`New Patient was added!`);
  };

  return (
    <>
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>Patients</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              Strabismus Reports
            </Typography>
          </div>
        </ExpansionPanelSummary>
        <Divider />
        <ExpansionPanelDetails className={classes.details}>
          <Typography>
            <span>Doe, John</span>
          </Typography>
          <div className={classes.column} />
          <div className={classes.column}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleVisibility}
            >
              Toggle Reports
              <ArrowIcon />
            </Button>
          </div>
         
          <div className={clsx(classes.column, classes.helper)}>
            <Typography variant="caption">
              <br />
              <img
                id="report"
                src={eyeCheck}
                style={{
                  width: "100px",
                  height: "120px",
                  display: "none"
                }}
                alt="eyecheck"
              />
            </Typography>
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelDetails>
          <Typography>
            <span style={{ width: "100px" }}>Doe, Jane</span>
          </Typography>
          <div className={classes.column} />
          <div className={classes.column}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleFundusVisibility}
            >
              Toggle Fundus
              <ArrowIcon />
            </Button>
          </div>
          <div className={clsx(classes.column, classes.helper)}>
            <Typography variant="caption">
              <br />
              <img
                id="fundus"
                src="http://www.njvision.net/wp-content/uploads/2015/05/faaea6a30b6bc45994eb59cf2062b659-300x300.jpg"
                style={{
                  width: "120px",
                  height: "120px",
                  display: "none"
                }}
                alt="eyecheck"
              />
            </Typography>
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button variant="contained" color="inherit">
            <a
              className={classes.link}
              href="https://www.dropbox.com/sh/qjoffk8hm4e0h9c/AADiULx8N2Ln3YUT_KHFP-Fya?dl=0"
            >
              View All{" "}
            </a>

            <FontAwesomeIcon
              style={{
                marginLeft: "5px"
              }}
              icon={faDropbox}
            />
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>Referred Patients</Typography>
          </div>
 
        </ExpansionPanelSummary>
        <Divider />
        <ExpansionPanelDetails className={classes.details}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Last, First </TableCell>
                <TableCell align="left">Record </TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left"><a href={PDF} target='_blank'>Record</a></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ExpansionPanelDetails>
        <ExpansionPanelDetails>
        
        </ExpansionPanelDetails>
        <Divider />
      </ExpansionPanel>


      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>Appointments</Typography>
          </div>
 
        </ExpansionPanelSummary>
        <Divider />
        <ExpansionPanelDetails className={classes.details}>
          
        </ExpansionPanelDetails>
        <ExpansionPanelDetails>
        {/* <img src={calendar} alt="calendar" style={{height: "675px", width: "900px", marginLeft: "160px",}}/> */}
          <Scheduling />
        </ExpansionPanelDetails>
        <Divider />
      </ExpansionPanel>





    </div>
    
</>
  );
}
