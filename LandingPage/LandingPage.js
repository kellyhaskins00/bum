import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { MemoryRouter as Router } from "react-router";
import { Route } from "react-router-dom";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import { Container } from "@material-ui/core";

const images = [
  {
    admin: {
      url:
        "https://images.pexels.com/photos/1451448/pexels-photo-1451448.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      title: "Administrator",
      width: "25%"
    },
    surgeon: {
      url:
        "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      title: "Surgeon",
      width: "25%"
    },
    patient: {
      url:
        "https://images.pexels.com/photos/127873/pexels-photo-127873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      title: "Patients",
      width: "25%"
    },
    optometrist: {
      url:
        "https://images.pexels.com/photos/305565/pexels-photo-305565.jpeg?cs=srgb&dl=adult-business-care-chair-305565.jpg&fm=jpg",
      title: "Optometrist",
      width: "25%"
    }
  }
];
let pic1 = `"${images[0].admin.url}"`;
let pic2 = `"${images[0].surgeon.url}"`;
let pic3 = `"${images[0].patient.url}"`;
let pic4 = `"${images[0].optometrist.url}"`;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 300,
    width: "100%",
    marginTop: "20px",
    margin: "auto"
  },
  image: {
    position: "relative",
    height: 200,
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: 100
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15
      },
      "& $imageMarked": {
        opacity: 0
      },
      "& $imageTitle": {
        border: "4px solid currentColor"
      }
    }
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%"
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity")
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) +
      6}px`
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity")
  }
}));

export default function ButtonBases() {
  const classes = useStyles();

  return (
    <Router>
      <Container>
        <Route path="/" />
        <div className={classes.root}>
          <ButtonBase
            key={images.title1}
            focusRipple
            focusVisibleClassName={classes.focusVisible}
            //component={Admin}
            to="/admin"
            className={classes.image}
            style={{
              backgroundImage: `url(${pic1})`,
              width: images[0].admin.width
            }}
          >
            <a href="/admin" to="/admin">
              <span
                className={classes.imageSrc}
                style={{
                  backgroundImage: `url(${pic1})`
                }}
              />
              <span className={classes.imageBackdrop} />
              <span className={classes.imageButton}>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  className={classes.imageTitle}
                >
                  {images[0].admin.title}
                  <span className={classes.imageMarked} />
                </Typography>
              </span>
            </a>
          </ButtonBase>
          <ButtonBase
            key={images.title2}
            focusRipple
            focusVisibleClassName={classes.focusVisible}
            // component={SurgeonLink}
            to="/surgeon"
            className={classes.image}
            style={{
              backgroundImage: `url(${pic2})`,
              width: images[0].admin.width
            }}
          >
            <a href="/surgeon" to="/surgeon">
              <span
                className={classes.imageSrc}
                style={{
                  backgroundImage: `url(${pic2})`
                }}
              />
              <span className={classes.imageBackdrop} />
              <span className={classes.imageButton}>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  className={classes.imageTitle}
                >
                  {images[0].surgeon.title}
                  <span className={classes.imageMarked} />
                </Typography>
              </span>
            </a>
          </ButtonBase>
          <ButtonBase
            key={images.title3}
            focusRipple
            focusVisibleClassName={classes.focusVisible}
            to="/patients"
            className={classes.image}
            style={{
              backgroundImage: `url(${pic3})`,
              width: images[0].patient.width
            }}
          >
            <a href="/patient/appointments" to="/patient/appointments">
              <span
                className={classes.imageSrc}
                style={{
                  backgroundImage: `url(${pic3})`
                }}
              />
              <span className={classes.imageBackdrop} />
              <span className={classes.imageButton}>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  className={classes.imageTitle}
                >
                  {images[0].patient.title}
                  <span className={classes.imageMarked} />
                </Typography>
              </span>
            </a>
          </ButtonBase>

          <ButtonBase
            key={images.title4}
            focusRipple
            focusVisibleClassName={classes.focusVisible}
            to="/patients"
            className={classes.image}
            style={{
              backgroundImage: `url(${pic4})`,
              width: images[0].optometrist.width
            }}
          >
            <a href="/optometrist" to="/optometrist">
              <span
                className={classes.imageSrc}
                style={{
                  backgroundImage: `url(${pic4})`
                }}
              />
              <span className={classes.imageBackdrop} />
              <span className={classes.imageButton}>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  className={classes.imageTitle}
                >
                  {images[0].optometrist.title}
                  <span className={classes.imageMarked} />
                </Typography>
              </span>
            </a>
          </ButtonBase>
        </div>
      </Container>
    </Router>
  );
}
