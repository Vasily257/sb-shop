import Basket from '../classes/Basket';
import CreditCard from '../classes/CreditCard';
import Header from '../classes/Header';
import PayForm from '../classes/PayForm';
import Products from '../classes/Products';
import TotalCost from '../classes/TotalCost';

const basket = new Basket();
const products = new Products(basket);
const totalCost = new TotalCost(basket);
const header = new Header(basket);
const creditCard = new CreditCard();
const payForm = new PayForm(creditCard);

products.init();
totalCost.init();
header.init();
creditCard.init();
payForm.init();
