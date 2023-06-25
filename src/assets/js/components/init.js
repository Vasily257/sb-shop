import Basket from '../classes/Basket';
import Products from '../classes/Products';

const basket = new Basket();
const products = new Products(basket);

products.init();
