import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import productList from '../../data/productList.json';
import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const data = productList.productList;
const styles = theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  },
  root: {
    flexGrow: 1,
    paddingTop:30,
    paddingBottom:50,
  },
});

class ProductsGrid extends Component {
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
          alignItems="center"
        >   
          {data.map((item) => {
            return <Grid item key={item.id}><Paper className={classes.paper}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={"../../data/images/1.jpg"}
                    title={item.title}/>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.url}
                    </Typography>
                    <Typography component="p">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio dignissimos possimus ex sequi odit quia aperiam et quaerat laudantium sed.
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Paper></Grid>
          })}
        </Grid>
      </div>
    );
  }
}

ProductsGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductsGrid);