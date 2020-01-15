import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: "20px"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

export default function PatientEdu() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Cataract Education
          </Typography>
        </ExpansionPanelSummary>
        <Divider />

        <ExpansionPanelDetails>
          <Typography>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/d5D0B2PoC7U"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>
            IOL Recommendation
          </Typography>
        </ExpansionPanelSummary>
        <Divider />

        <ExpansionPanelDetails>
          <Typography>
            You have been recommended an Acommadating Lens with an Aspheric
            Upgrade. <br />
            This was chosen for you based on your lifestyle choices.
            <br /> <br />
            <ul>
              <li>You want to see at all distances without glasses</li>
              <li>You have a preference of mid-range/distance vision</li>
              <li>You want to have clearer, higher contrast vision</li>
              <li>
                You want to reduce the negative aberrations of low-light
                conditions
              </li>
              <li>
                You’re willing to pay a little extra for the best vision outcome
                after surgery
              </li>
            </ul>
            <br />
            <br />
            Here is a link to view more information, along with videos of your
            recommendation:{" "}
            <a href="http://accom-aspheric.herokuapp.com/" target="_blank">
              Accommodating & Aspheric IOL
            </a>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
