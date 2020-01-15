import React from "react";
import PropTypes from "prop-types";
import { FormControl, Input, InputLabel } from "@material-ui/core";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./Form.module.css";

const Form = ({ onChange, onSubmit, props }) => (
  <>
    <div className={styles.Form}>
      <FormControl>
        <InputLabel htmlFor="heading">Heading: </InputLabel>
        <Input className={styles.Inputs} name="heading" onChange={onChange} />
      </FormControl>
      <br />
      <FormControl>
        <InputLabel htmlFor="mission">Mission: </InputLabel>
        <Input className={styles.Inputs} name="mission" onChange={onChange} />
      </FormControl>
      <br />
      <FormControl>
        <InputLabel htmlFor="src">VideoURL: </InputLabel>
        <Input className={styles.Inputs} name="src" onChange={onChange} />
      </FormControl>
      <br />
      <FormControl>
        <InputLabel htmlFor="why">Why: </InputLabel>
        <Input className={styles.Inputs} name="why" onChange={onChange} />
      </FormControl>
      <br />
      <FormControl>
        <InputLabel htmlFor="expectation">Expectations: </InputLabel>
        <Input
          className={styles.Inputs}
          name="expectation"
          onChange={onChange}
        />
      </FormControl>
      <br />
      <FormControl>
        <InputLabel htmlFor="payment">Payment: </InputLabel>
        <Input className={styles.Inputs} name="payment" onChange={onChange} />
      </FormControl>
      <br />
      <FormControl>
        <InputLabel htmlFor="next">Next: </InputLabel>
        <Input className={styles.Inputs} name="next" onChange={onChange} />
      </FormControl>
    </div>
  </>
);

export default Form;
