import utils from '../utils/utils';
// eslint-disable-next-line no-unused-vars
import Basket from './Basket';

class Products {
	/**
	 * Создать экземпляр Products, который меняет состояние Basket
	 * @constructor
	 * @param {Basket} basket - экземпляр Basket
	 */
	constructor(basket) {
		/**
		 * Экземпляр Basket
		 * @type {Basket}
		 */
		this._basket = basket;

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
		 * @type {Record<number, {count: number, price: number,}>}
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

			this._getInitialDataFromMarkup(product);
			this._getElements(product);
			this._setEventListeners(product);
		}
	}

	/**
	 * Получить исходную информацию по товарам из разметки
	 * @param {HTMLElement} product - ссылка на элемент товара
	 */
	_getInitialDataFromMarkup(product) {
		const productId = product.getAttribute('data-id');
		const countTextContent = product.querySelector('.products__number').textContent;
		const costTextContent = product.querySelector('.products__cost').textContent;

		const count = utils.parseStringAsNumber(countTextContent);
		const cost = utils.parseStringAsNumber(costTextContent);

		this._ixProductValues[productId] = {
			count,
			price: cost / count,
		};

		this._subtotalCost += cost;
	}

	/**
	 * Получить ссылки на внутренние HTML-элементы товара
	 * @param {HTMLElement} product - ссылка на элемент товара
	 */
	_getElements(product) {
		const productId = product.getAttribute('data-id');

		this._ixProductElements[productId] = {
			count: product.querySelector('.products__number'),
			cost: product.querySelector('.products__cost'),
		};
	}

	/**
	 * Добавить слушателей событий
	 * @param {HTMLElement} product - ссылка на элемент товара
	 */
	_setEventListeners(product) {
		product.addEventListener('click', this._handleProductClick.bind(this));
	}

	/**
	 * Обработать событие клика на товар
	 * @param {Event} evt - событие
	 */
	_handleProductClick(evt) {
		const productId = evt.currentTarget.getAttribute('data-id');
		const buttonElement = evt.target.parentNode;

		if (buttonElement.classList.contains('products__button_type_plus')) {
			this._handlePlusButtonClick(productId);
		}

		if (buttonElement.classList.contains('products__button_type_minus')) {
			this._handleMinusButtonClick(productId);
		}

		if (buttonElement.classList.contains('products__button_type_close')) {
			this._handleCloseButtonClick({ productId, evt });
		}
	}

	/**
	 * Обработать клик на кнопку увеличения количества товаров
	 * @param {number} productId - идентификатор товара
	 */
	_handlePlusButtonClick(productId) {
		this._increaseProductCount(productId);
		this._updateProductCost(productId);
		this._increaseSubtotalCost(productId);
	}

	/**
	 * Обработать клик на кнопку уменьшения количества товаров
	 * @param {number} productId - идентификатор товара
	 */
	_handleMinusButtonClick(productId) {
		this._decreaseProductCount(productId);
		this._updateProductCost(productId);
		this._decreaseSubtotalCost(productId);
	}

	/**
	 * Обработать клик на кнопку закрытия
	 * @param {Object} options - опции
	 * @param {number} options.productId - идентификатор продукта
	 * @param {Event} options.evt - объект события
	 */
	_handleCloseButtonClick({ productId, evt }) {
		const productValues = this._ixProductValues[productId];
		const { price, count } = productValues;

		this._subtotalCost -= price * count;
		this._basket.updateSubtotalCost(this._subtotalCost);

		evt.currentTarget.remove();

		productValues.count = 0;
	}

	/**
	 * Увеличить количество товаров на 1
	 * @param {number} productId - идентификатор товара
	 */
	_increaseProductCount(productId) {
		const productValues = this._ixProductValues[productId];

		// Ограничить количество добавляемых товаров
		if (productValues.count < 20) {
			this._ixProductValues[productId].count += 1;
			this._ixProductElements[productId].count.textContent = productValues.count;
		}
	}

	/**
	 * Уменьшить количество товаров на 1
	 * @param {number} productId - идентификатор товара
	 */
	_decreaseProductCount(productId) {
		const productValues = this._ixProductValues[productId];

		if (productValues.count === 1) {
			this._ixProductElements[productId].count.closest('.products__item').remove();
		}

		this._ixProductValues[productId].count -= 1;

		if (productValues.count > 0) {
			this._ixProductElements[productId].count.textContent = productValues.count;
		}
	}

	/**
	 * Обновить стоимость товара
	 * @param {number} productId - идентификатор товара
	 */
	_updateProductCost(productId) {
		const productValues = this._ixProductValues[productId];
		const { price, count } = productValues;

		const costTextContent = `$ ${utils.formatNumber(price * count)}`;
		this._ixProductElements[productId].cost.textContent = costTextContent;
	}

	/**
	 * Увеличить промежуточную стоимость всех товаров
	 * @param {number} productId - идентификатор товара
	 */
	_increaseSubtotalCost(productId) {
		this._subtotalCost += this._ixProductValues[productId].price;
		this._basket.updateSubtotalCost(this._subtotalCost);
	}

	/**
	 * Уменьшить промежуточную стоимость всех товаров
	 * @param {number} productId - идентификатор товара
	 */
	_decreaseSubtotalCost(productId) {
		this._subtotalCost -= this._ixProductValues[productId].price;

		this._basket.updateSubtotalCost(this._subtotalCost);
	}
}

export default Products;
