import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {productList} from '../../data/productList.js';
import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {connect} from 'react-redux';
import {addToCart} from '../../actions/simpleAction'
import {getLocalStorageData} from '../../api';

const data = productList;
const styles = theme => ({
  card: {
    paddingBottom: 10
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
    height:467
  },
  productInfo:{
    paddingLeft:20,
    paddingTop:20,
  }
});

class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeProduct: {},
      quantity: 1
    }
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  componentWillMount() {
    const activeProduct = productList.find(item => item.id === parseInt(this.props.location.pathname.split('/')[2]))
    this.setState({activeProduct})
  }
  renderDropdown = (quantity)=>{
    const MenuItems = [];
    for (let index = 1; index <= quantity; index++) {
      MenuItems.push(<MenuItem value={index} key={index}>{index}</MenuItem>);
    }
    return MenuItems;
  }
  handleAddtoCart = (id)=>{
    const existing = localStorage.getItem(id);
    existing ? localStorage.setItem(id,Number(existing)+this.state.quantity) : localStorage.setItem(id,this.state.quantity)
    console.log(localStorage);
    const newCart = getLocalStorageData();
    this.props.addToCart(newCart);
  }
  render() {
    const {classes} = this.props;
    const {title, url, desc , price , id ,quantity} = this.state.activeProduct;
    return (
      <div>
        <Grid container className={classes.root} direction="row">
          <Grid item xs style={{height:467}}>
            <img src={url} className={classes.image} alt=""/>
          </Grid>
          <Grid item xs className={classes.productInfo}>
            <Typography variant="h5" gutterBottom>
              {title}
            </Typography>

            <Typography  gutterBottom style={{marginTop:20}}>
              {desc}
            </Typography>
            <Typography variant="h6" gutterBottom style={{marginTop:50}}>
              {price}$
            </Typography>
            <Typography variant="h6" gutterBottom style={{marginTop:50}}>
              Available units : {quantity}
            </Typography>
            
            <div style={{marginTop:50}}>
            {quantity > 0 &&<Select
                value={this.state.quantity}
                onChange={this.handleChange}
                style={{width:100}}
                inputProps={{
                name: 'quantity',
              }}>
              {this.renderDropdown(quantity)}
              </Select>}
            {quantity > 0 && <Button size="small" color="primary" style={{marginLeft:30}} onClick={()=>{this.handleAddtoCart(id)}}>
              Add to cart
            </Button>}
            </div>
          </Grid>
        </Grid>

      </div>
    );
  }
}

ProductItem.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapDispatchToProps = {
  addToCart
};
function mapStateToProps(state) {
  return {cart: state.simpleReducer.cart};
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProductItem));