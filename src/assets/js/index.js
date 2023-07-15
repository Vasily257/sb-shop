class ProjectApp {
	constructor() {
		this.env = require('./utils/env').default;
		this.utils = require('./utils/utils').default;
		this.classes = {
			Basket: require('./classes/Basket').default,
			CreditCard: require('./classes/CreditCard').default,
			Header: require('./classes/Header').default,
			PayForm: require('./classes/PayForm').default,
			Products: require('./classes/Products').default,
			TotalCost: require('./classes/TotalCost').default,
		};
		this.components = {};
		this.helpers = {};
		this.modules = {};

		document.addEventListener('DOMContentLoaded', () => {
			document.documentElement.classList.remove('_loading');
		});
	}

	/** Инициализировать приложение */
	initApp() {
		this._createComponents();
		this._initComponents();
	}

	/** Создать компоненты */
	_createComponents() {
		this.components.basket = new this.classes.Basket();
		this.components.products = new this.classes.Products(this.components.basket);
		this.components.totalCost = new this.classes.TotalCost(this.components.basket);
		this.components.header = new this.classes.Header(this.components.basket);
		this.components.creditCard = new this.classes.CreditCard();
		this.components.payForm = new this.classes.PayForm(this.components.creditCard);
	}

	/** Инициализировать компоненты */
	_initComponents() {
		this.components.products.init();
		this.components.totalCost.init();
		this.components.header.init();
		this.components.creditCard.init();
		this.components.payForm.init();
	}
}

global.ProjectApp = new ProjectApp();
global.ProjectApp.initApp();

if (module.hot) {
	module.hot.accept();
}
