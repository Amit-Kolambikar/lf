import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {productList} from '../../data/productList.js';
import {getLocalStorageData} from '../../api';
import {connect} from 'react-redux';
import {toast} from 'react-toastify';
import {updateCart} from '../../actions/simpleAction'

const data = productList;
const styles = theme => ({
  cartBlock: {
    width: 500,
    height: 400,
    paddingTop: 0
  },
  cartItem: {
    paddingTop: 25,
    height: 60,
    paddingLeft: 15,
    position: 'relative',
    borderBottom: '1px solid #eee'
  },
  checkoutButton: {
    margin: '0 auto',
    display: 'block'
  }
});

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: []
    }
  }
  componentDidMount = () => {
    const cart = this.props.cart;
    Object
      .keys(cart)
      .map((item) => {
        return data.map(product => {
          if (product.id === parseInt(item)) {
            return this.setState(prevState => ({
              cart: [
                ...prevState.cart, {
                  title: product.title,
                  price: product.price,
                  qty: cart[item]
                }
              ]
            }))
          }
          return null;
        })
      })
  }
  deleteCartItem = (id) => {
    localStorage.removeItem(id);
    toast.error(` Removed from cart!`, {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false
    });
    const newCart = getLocalStorageData();
    this
      .props
      .updateCart(newCart);
  }
  render() {
    const {classes, cart} = this.props;

    return (
      <div className={classes.cartBlock}>
        {Object
          .keys(cart)
          .map((item) => {
            return data.map(product => {
              if (product.id === parseInt(item)) {
                return <div className={classes.cartItem} key={product.id}>{product.title}
                  <span style={{
                    marginLeft: 70
                  }}>Qty:{cart[item]}</span>
                  <span style={{
                    marginLeft: 70
                  }}>Price:{product.price * cart[item]}$</span>
                  <IconButton
                    style={{
                    position: 'absolute',
                    right: 10,
                    top: 10
                  }}
                    className={classes.button}
                    aria-label="Delete"
                    onClick={() => {
                    this.deleteCartItem(product.id)
                  }}>
                    <DeleteIcon/>
                  </IconButton>
                </div>
              } else {
                return <div key={product.id}></div>
              }
            })
          })}
        <Button
          size="small"
          color="primary"
          variant="outlined"
          style={{
          marginTop: 30,
          marginBottom: 30
        }}
          className={classes.checkoutButton}
          onClick={() => {
          this
            .props
            .history
            .push({
              pathname: '/checkout'
            });
        }}>
          Proceed to checkout
        </Button>
      </div>
    )
  }
}

Cart.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapDispatchToProps = {
  updateCart
};

const mapStateToProps=(state)=> {
    console.log("mapStateToProps",state.simpleReducer.cart);
    return {cart: state.simpleReducer.cart};
  }
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Cart));