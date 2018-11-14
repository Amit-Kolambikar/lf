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
import Badge from '@material-ui/core/Badge';
import {toast} from 'react-toastify';
import {connect} from 'react-redux';
import {addToCart} from '../../actions/simpleAction'
import {getLocalStorageData} from '../../api';

const data = productList;
const styles = theme => ({
  card: {
    maxWidth: 345,
    paddingBottom: 10,
    borderRadius: 0
  },
  media: {
    height: 240
  },
  root: {
    flexGrow: 1,
    paddingTop: 50,
    paddingBottom: 50
  },
  gridItem: {
    marginBottom: 30,
    position: 'relative'
  },
  marginBadge: {
    margin: theme.spacing.unit * 2
  },
  paddingBadge: {
    padding: `0 ${theme.spacing.unit * 2}px`
  }
});

class ProductsGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1
    }
  }
  componentWillMount() {
    const newCart = getLocalStorageData();
    this.props.addToCart(newCart);
  }
  handleProductIdChange = (id) => {
    this
      .props
      .history
      .push({pathname: `/products/${id}`});
  }
  AddtoCart = (quantity, item) => {
    const existing = localStorage.getItem(item.id);
    existing ? localStorage.setItem(item.id,Number(existing)+1) : localStorage.setItem(item.id,1)
    console.log(localStorage);
    const newCart = getLocalStorageData();
    this.props.addToCart(newCart);
    toast.success(`${item.title} - Added to cart!`, {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false
    });
  }
  render() {
    const {classes} = this.props;
    return (
      <div>
        <Grid
          container
          spacing={24}
          className={classes.root}
          direction="row"
          justify="center"
          alignItems="center">
          {data.map((item) => {
            const quantity = item.quantity;
            return <Grid item key={item.id} className={classes.gridItem}>
              <Paper className={classes.paper}>
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      image={item.url}
                      className={classes.media}
                      title={item.title}
                      onClick={() => {
                      this.handleProductIdChange(item.id)
                    }}/>
                    <CardContent
                      onClick={() => {
                      this.handleProductIdChange(item.id)
                    }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {item.title}
                      </Typography>
                      <Typography component="p">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio dignissimos
                        possimus ex sequi odit quia aperiam et quaerat laudantium sed.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    {quantity > 0 && <Button
                      size="small"
                      color="primary"
                      onClick={() => {
                      this.AddtoCart(1, item);
                    }}>
                      Add to cart
                    </Button>}
                    <Typography
                      gutterBottom
                      style={{
                      position: 'absolute',
                      top: 20,
                      right: 20,
                      backgroundColor: '#fff',
                      padding: 10,
                      fontWeight: 'bold'
                    }}>
                      {item.price}$
                    </Typography>

                    <Badge color="primary" badgeContent={quantity} className={classes.marginBadge}>
                      <Typography className={classes.paddingBadge}>Stock</Typography>
                    </Badge>
                  </CardActions>
                </Card>
              </Paper>
            </Grid>
          })}
        </Grid>
      </div>
    );
  }
}

ProductsGrid.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapDispatchToProps = {
  addToCart
};
function mapStateToProps(state) {
  return {cart: state.simpleReducer.cart};
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProductsGrid));
