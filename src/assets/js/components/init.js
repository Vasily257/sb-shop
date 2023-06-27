import Basket from '../classes/Basket';
import Products from '../classes/Products';
import TotalCost from '../classes/TotalCost';

const basket = new Basket();
const products = new Products(basket);
const totalCost = new TotalCost(basket);

products.init();
totalCost.init();
