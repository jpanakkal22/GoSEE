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
  },
});

export default function TemporaryDrawer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });
  const [value, setValue] = React.useState(0);

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
    password: ""
  })

  let history = useHistory();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
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

  const handleFormSubmit = (event) => {
    event.preventDefault();
    API.createUser(formInput)
      .then(user => {           
          history.push("/feed");      
      })
      .catch((err) => {
        if(err) console.log("Unauthorized!")
      });
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    console.log(loginInput)
    API.loginUser(loginInput)
      .then((id) => {  
          props.setUser(id.data);
          history.push("/feed");      
      })
      .catch((err) => {
        if(err) console.log("Unauthorized!")
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
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
        centered
      >
        <Tab label="Create an Account" />
        <Tab label="Login" />
      </Tabs>

      <TabPanel value={value} index={0}>
        <div className="lp-form">
          <FormControl>
            <InputLabel htmlFor="my-input">First Name</InputLabel>
            <Input
              id="my-input"
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
            <InputLabel htmlFor="my-input">Last Name</InputLabel>
            <Input
              id="my-input"
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
            <InputLabel htmlFor="my-input">Email address</InputLabel>
            <Input
              id="my-input"
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
            <InputLabel htmlFor="my-input">Password</InputLabel>
            <Input
              id="my-input"
              name="password"
              type="password"
              aria-describedby="my-helper-text"
              onChange={handleInputChange}
              required
            />
            <FormHelperText id="my-helper-text">
              We'll never share your email.
            </FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="my-input">City</InputLabel>
            <Input
              id="my-input"
              name="city"
              aria-describedby="my-helper-text"
              onChange={handleInputChange}
            />
            <FormHelperText id="my-helper-text">
              We'll never share your email.
            </FormHelperText>
          </FormControl>
          <FormControl>
            <Button
              htmlFor="my-input"
              className="submitButton"
              variant="contained"
              onClick={handleFormSubmit}
            >
              Submit
            </Button>
          </FormControl>
        </div>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <div className="lp-form">
          <FormControl>
            <InputLabel htmlFor="my-input">Email address</InputLabel>
            <Input
              id="email"
              aria-describedby="my-helper-text"
              type="email"
              required
              name= "email"
              onChange={handleLoginChange}
            />
            <FormHelperText id="my-helper-text"></FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="my-input">Password</InputLabel>
            <Input
              id="password"
              aria-describedby="my-helper-text"
              type="password"
              required
              name="password"
              onChange={handleLoginChange}
            />
            <FormHelperText id="my-helper-text"></FormHelperText>
          </FormControl>
          <Button
            id="submitButton"
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
        <h1>CTA Title: Want to Travel? </h1>
        <p>Paragraph explaining how easy it is to plan trips with our app.</p>
        {["right"].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}>Get Started </Button>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
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
