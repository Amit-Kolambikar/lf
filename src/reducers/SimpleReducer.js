export default(state = {cart :{}}, action) => {
  console.log(action);
  switch (action.type) {
    case 'addToCart':
      return {cart :action.newCart}
    case 'updateCart':
      return {cart :action.newCart}
    default:
      return state
  }
}