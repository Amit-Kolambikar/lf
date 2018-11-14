export const addToCart = (newCart) => dispatch => {
    dispatch({
     type: 'addToCart',
     newCart
    })
   }

   export const updateCart = (newCart) => dispatch => {
    dispatch({
     type: 'updateCart',
     newCart
    })
   }
   