import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import API from "../../utils/API";
import clsx from "clsx";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
// import List from "@material-ui/core/List";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "../TabPanel";
import {
  FormControl,
  //   FormControlLabel,
  InputLabel,
  Input,
  FormHelperText,
} from "@material-ui/core";

const useStyles = makeStyles({
  list: {
    width: 400,
    background: "white",
    height: "100%",
  },
});

function FormTabs(props) {
  const classes = useStyles();
  const [drawerState, setDrawerState] = useState({
    right: false,
  });
  const [value, setValue] = useState(0);

  // Set initial state
  const [formInput, setFormInput] = useState({
    firstName: " ",
    lastName: " ",
    email: "",
    password: "",
    city: "",
  });

  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  let history = useHistory();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerState({ ...drawerState, [anchor]: open });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Handle input change from form and update state
  const handleInputChange = (evt) => {
    const value = evt.target.value;
    setFormInput({
      ...formInput,
      [evt.target.name]: value,
    });
  };

  // Handle input change from form and update state
  const handleLoginChange = (evt) => {
    const value = evt.target.value;
    setLoginInput({
      ...loginInput,
      [evt.target.name]: value,
    });
  };
  // Create User
  const handleFormSubmit = (event) => {
    event.preventDefault();
    API.createUser(formInput)
      .then((user) => {
        props.setUser(user.data);
        history.push("/feed");
      })
      .catch((err) => {
        if (err) console.log("Unauthorized!");
      });
  };
  // Login User
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    API.loginUser(loginInput)
      .then((user) => {
        props.setUser(user.data);
        history.push("/feed");
      })
      .catch((err) => {
        if (err) console.log("Unauthorized!");
      });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="disabled tabs example"
        centered
      >
        <Tab label="Create an Account" />
        <Tab label="Login" />
      </Tabs>

      <TabPanel className="lp-form" value={value} index={0} >
        <FormControl>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <Input
            id="firstName"
            name="firstName"
            aria-describedby="my-helper-text"
            onChange={handleInputChange}
            required
          />
          <FormHelperText id="my-helper-text">
            You must enter your first name.
          </FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <Input
            id="lastName"
            name="lastName"
            aria-describedby="my-helper-text"
            onChange={handleInputChange}
            required
          />
          <FormHelperText id="my-helper-text">
            You must enter your last name.
          </FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="email">Email address</InputLabel>
          <Input
            id="email"
            name="email"
            type="email"
            aria-describedby="my-helper-text"
            onChange={handleInputChange}
            required
          />
          <FormHelperText id="my-helper-text">
            We'll never share your email.
          </FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            name="password"
            type="password"
            aria-describedby="my-helper-text"
            onChange={handleInputChange}
            required
          />
          <FormHelperText id="my-helper-text">
          You must enter a password.
          </FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="city">City</InputLabel>
          <Input
            id="city"
            name="city"
            aria-describedby="my-helper-text"
            onChange={handleInputChange}
          />
          <FormHelperText id="my-helper-text">
          Please enter your city.
          </FormHelperText>
        </FormControl>
        <FormControl>
          <Button
            htmlFor="registerSubmitButton"
            id="registerSubmitButton"
            className="submitButton"
            variant="contained"
            onClick={handleFormSubmit}
          >
            Submit
          </Button>
        </FormControl>

      </TabPanel>

      <TabPanel value={value} index={1}>
        <div className="lp-form">
          <FormControl>
            <InputLabel htmlFor="loginEmail">Email address</InputLabel>
            <Input
              id="loginEmail"
              aria-describedby="my-helper-text"
              type="email"
              required
              name="email"
              onChange={handleLoginChange}
            />
            <FormHelperText id="my-helper-text"></FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="loginPassword">Password</InputLabel>
            <Input
              id="loginPassword"
              aria-describedby="my-helper-text"
              type="password"
              required
              name="password"
              onChange={handleLoginChange}
            />
            <FormHelperText id="my-helper-text"></FormHelperText>
          </FormControl>
          <Button
            htmlFor="loginSubmit"
            id="loginSubmit"
            className="submitButton"
            variant="contained"
            onClick={handleLoginSubmit}
          >
            Login
          </Button>
        </div>
      </TabPanel>
    </div>
  );

  return (
    <div>
    <span className="bottom-right">
      <h1>Looking to Travel? <span style={{fontFamily: "Roboto, sans-serif", fontWeight: "900",  color: "white"}} >
       <span style={{color: "#f7ee24"}}> GO</span>SEE</span> </h1>
      <p>GO SEE is your favorite social media app before, during, and after traveling.</p>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>Get Started </Button>
          <Drawer
            anchor={anchor}
            open={drawerState[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </span>
  </div>
  );
}

export default FormTabs;
