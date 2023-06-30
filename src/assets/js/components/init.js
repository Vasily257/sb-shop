import Basket from '../classes/Basket';
import Header from '../classes/Header';
import Products from '../classes/Products';
import TotalCost from '../classes/TotalCost';

const basket = new Basket();
const products = new Products(basket);
const totalCost = new TotalCost(basket);
const header = new Header(basket);

products.init();
totalCost.init();
header.init();
