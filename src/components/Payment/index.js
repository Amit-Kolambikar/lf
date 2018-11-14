import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {productList} from '../../data/productList.js';
import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import {Link} from 'react-router-dom';
import FormHelperText from '@material-ui/core/FormHelperText';
import TableBody from '@material-ui/core/TableBody';
import InputLabel from '@material-ui/core/InputLabel';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {connect} from 'react-redux';
import {fetchCart} from '../../actions/simpleAction'
import {getLocalStorageData} from '../../api';
const data = productList;
const styles = theme => ({
  card: {
    paddingBottom: 10
  },
  table: {
    minWidth: 700,
    textAlign: 'left'
  },
  media: {
    height: 240
  },
  root: {
    flexGrow: 1,
    marginTop: 50,
    backgroundColor: '#fff',
    maxWidth: 1100,
    margin: '0 auto'
  },
  gridItem: {
    marginBottom: 30
  },
  image: {
    width: 700,
    height: 467
  },
  productInfo: {
    paddingLeft: 20,
    paddingTop: 20
  }
});

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      phone: 0
    }
  }
  handleChange = (event) => {
    const phone = event.target.value;
    this.setState({phone});
  }
  handleTextChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = () => {}
  render() {
    const {classes} = this.props;
    return (
      <div>
        <Grid container className={classes.root} direction="row">
          <Grid item xs>
            <div style={{
              padding: 30
            }}>
              <Typography variant="h6">Payment:</Typography>
              <ValidatorForm className={classes.form} onSubmit={this.handleSubmit}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="firstname">First Name</InputLabel>
                  <Input
                    id="firstname"
                    name="firstName"
                    autoComplete="firstname"
                    value={this.state.firstName}
                    onChange={this.handleTextChange}/>
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="lastName">Last Name</InputLabel>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={this.state.lastName}
                    autoComplete="lastName"
                    onChange={this.handleTextChange}/>
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <TextValidator
                    label="Email"
                    onChange={this.handleTextChange}
                    name="email"
                    value={this.state.email}
                    validators={['required', 'isEmail']}
                    errorMessages={['this field is required', 'email is not valid']}/>
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="address">Address</InputLabel>
                  <Input
                    id="address"
                    name="address"
                    autoComplete="address"
                    value={this.state.address}
                    autoComplete="lastName"
                    onChange={this.handleTextChange}/>
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <TextValidator
                    id="phone"
                    label="Mobile Number"
                    name="phone"
                    type="number"
                    value={this.state.phone}
                    onChange={this.handleChange}/>
                </FormControl>
                <FormHelperText id="name-helper-text" error>
                  {this.state.error}
                </FormHelperText>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}>
                  Submit
                </Button>
              </ValidatorForm>
            </div>
          </Grid>
        </Grid>

      </div>
    );
  }
}

Payment.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = {
  fetchCart
};

const mapStateToProps = (state) => {
  console.log("mapStateToProps", state.simpleReducer.cart);
  return {cart: state.simpleReducer.cart};
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Payment));