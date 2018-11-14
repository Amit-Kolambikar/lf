import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {fade} from '@material-ui/core/styles/colorManipulator';
import {withStyles} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import CartIcon from '@material-ui/icons/ShoppingCart';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Cart from './Cart';
import { connect } from 'react-redux';
import {addToCart} from '../../actions/simpleAction'
import {getLocalStorageData} from '../../api';

const styles = theme => ({
  root: {
    width: '100%'
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: 'none',
    cursor:'pointer',
    [
      theme
        .breakpoints
        .up('sm')
    ]: {
      display: 'block',
      cursor:'pointer'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [
      theme
        .breakpoints
        .up('sm')
    ]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme
      .transitions
      .create('width'),
    width: '100%',
    [
      theme
        .breakpoints
        .up('md')
    ]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: 'none',
    [
      theme
        .breakpoints
        .up('md')
    ]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [
      theme
        .breakpoints
        .up('md')
    ]: {
      display: 'none'
    }
  }
});

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
      cart:[]
    };
  }
  componentDidMount = () => {
      const newCart = getLocalStorageData();
      this.props.addToCart(newCart);
  }
  
  handleProfileMenuOpen = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleMenuClose = () => {
    this.setState({anchorEl: null});
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({mobileMoreAnchorEl: event.currentTarget});
  };

  handleMobileMenuClose = () => {
    this.setState({mobileMoreAnchorEl: null});
  };

  render() {
    const {anchorEl, mobileMoreAnchorEl} = this.state;
    const {classes} = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const newCart = getLocalStorageData();
    console.log("newCart",newCart);
    const tempArray = Object.values(newCart).map(item =>{
      return Number(item,10);
    })
    const totalQty = tempArray.reduce(function(a, b) { return a + b; }, 0);
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
      style={{marginTop:40}}
        transformOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}>
        <Cart handleMenuClose={this.handleMenuClose} cart={this.props.cart} history={this.props.history}/>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
        transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}>
        <MenuItem>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              <CartIcon/>
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <CartIcon/>
          </IconButton>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap
              onClick={() => {
              this
                .props
                .history
                .push('/')
            }}>
              Nike
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon/>
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}/>
            </div>
            <div className={classes.grow}/>
            <div className={classes.sectionDesktop}>
              <IconButton
                aria-owns={isMenuOpen
                ? 'material-appbar'
                : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit">
                <Badge badgeContent={totalQty} color="secondary">
                <CartIcon/>
                </Badge>
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit">
                <MoreIcon/>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  return {cart: state.simpleReducer.cart};
}
const mapDispatchToProps = {
  addToCart
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header));
