export const getLocalStorageData = () => {
const cart = {};
  for (var key in localStorage) {
    if (localStorage.getItem(key) && localStorage.getItem(key)!='NaN'){
        cart[key] = localStorage.getItem(key)
    } 
    else {
        delete cart[key];
    }
  }
  return cart;
}
