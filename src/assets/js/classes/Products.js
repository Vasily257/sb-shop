import utils from '../utils/utils';

/**
 * @typedef {Object} ProductInfo
 * @property {HTMLElement} product - ссылка на элемент товара
 * @property {number} productId - идентификатор товара
 */

class Products {
	constructor() {
		/**
		 * HTML-коллекция товаров
		 * @type {NodeListOf<HTMLElement>}
		 */
		this._products = document.querySelectorAll('.products__item');

		/**
		 * Ссылки на внутренние HTML-элементы товаров, индексированные по id товара
		 * @type {Record<number, {count: HTMLElement,  cost: HTMLElement}>}
		 */
		this._ixProductElements = {};

		/**
		 * Значения товаров, индексированные по id товара
		 * @type {Record<number, {count: number, cost: number, price: number,}>}
		 */
		this._ixProductValues = {};

		/**
		 * Промежуточная стоимость всех товаров
		 * @type {number}
		 */
		this._subtotalCost = 0;
	}

	/** Инициализировать компонент */
	init() {
		this._iterateProducts();
	}

	/** Перебрать HTML-коллекцию товаров */
	_iterateProducts() {
		for (let i = 0; i < this._products.length; i++) {
			const product = this._products[i];
			const productId = product.getAttribute('data-id');

			this._getInitialDataFromMarkup({ product, productId });
			this._getElements({ product, productId });
			this._setEventListeners({ product, productId });
		}
	}

	/** Получить исходную информацию по товарам из разметки
	 * @param {ProductInfo} productInfo - информация о товаре
	 */
	_getInitialDataFromMarkup({ product, productId }) {
		const countTextContent = product.querySelector('.products__number').textContent;
		const costTextContent = product.querySelector('.products__cost').textContent;

		const count = utils.parseStringAsNumber(countTextContent);
		const cost = utils.parseStringAsNumber(costTextContent);

		this._ixProductValues[productId] = {
			count,
			cost,
			price: cost / count,
		};

		this._subtotalCost += cost;
	}

	/**
	 * Получить ссылки на внутренние HTML-элементы товара
	 * @param {ProductInfo} productInfo - информация о товаре
	 */
	_getElements({ product, productId }) {
		this._ixProductElements[productId] = {
			count: product.querySelector('.products__number'),
			cost: product.querySelector('.products__cost'),
		};
	}

	/** Добавить слушателей событий
	 * @param {ProductInfo} productInfo - информация о товаре
	 */
	_setEventListeners({ product, productId }) {
		product.addEventListener('click', evt => this._handleProductClick(evt, productId));
	}

	/** Обработать клик на товар
	 * @param {Event} evt - событие
	 * @param {number} productId - идентификатор товара
	 */
	_handleProductClick(evt, productId) {
		const buttonElement = evt.target.parentNode;

		if (buttonElement.classList.contains('products__button_type_plus')) {
			this._incrementProductCount(productId);
			this._updateProductCost(productId);
			this._increaseSubtotalCost(productId);
		}

		if (buttonElement.classList.contains('products__button_type_minus')) {
			this._decrementProductCount(productId);
			this._updateProductCost(productId);
			this._decreaseSubtotalCost(productId);
		}

		if (buttonElement.classList.contains('products__button_type_close')) {
			evt.currentTarget.remove();
		}
	}

	/**
	 * Увеличить количество товаров на 1
	 * @param {number} productId - идентификатор товара
	 */
	_incrementProductCount(productId) {
		const product = this._ixProductValues[productId];

		// Ограничить количество добавляемых товаров
		if (product.count < 20) {
			this._ixProductValues[productId].count += 1;
		}

		this._ixProductElements[productId].count.textContent = product.count;
	}

	/**
	 * Уменьшить количество товаров на 1
	 * @param {number} productId - идентификатор товара
	 */
	_decrementProductCount(productId) {
		const product = this._ixProductValues[productId];

		if (product.count > 0) {
			this._ixProductValues[productId].count -= 1;
		}

		this._ixProductElements[productId].count.textContent = product.count;
	}

	/**
	 * Обновить стоимость товара
	 * @param {number} productId - идентификатор товара
	 */
	_updateProductCost(productId) {
		const product = this._ixProductValues[productId];
		product.cost = product.count * product.price;

		const costTextContent = `$ ${utils.formatNumber(product.cost)}`;
		this._ixProductElements[productId].cost.textContent = costTextContent;
	}

	/**
	 * Увеличить промежуточную стоимость всех товаров
	 * @param {number} productId - идентификатор товара
	 */
	_increaseSubtotalCost(productId) {
		this._subtotalCost += this._ixProductValues[productId].price;
	}

	/**
	 * Уменьшить промежуточную стоимость всех товаров
	 * @param {number} productId - идентификатор товара
	 */
	_decreaseSubtotalCost(productId) {
		this._subtotalCost -= this._ixProductValues[productId].price;
	}
}
export default Products;
