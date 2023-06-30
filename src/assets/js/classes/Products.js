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
		 * @type {Record<number, Record<string, HTMLElement>>}
		 */
		this._ixProductElements = {};

		/**
		 * Значения товаров, индексированные по id товара
		 * @type {Record<number, {count: number, price: number,}>}
		 */
		this._ixProductValues = {};

		/**
		 * Количество всех товаров
		 * @type {number}
		 */
		this._totalCount = 0;

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

		this._totalCount += count;
		this._subtotalCost += cost;
	}

	/**
	 * Получить ссылки на внутренние HTML-элементы товара
	 * @param {HTMLElement} product - ссылка на элемент товара
	 */
	_getElements(product) {
		const productId = Number(product.getAttribute('data-id'));

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
		const { count, price } = this._ixProductValues[productId];

		if (count < 20) {
			// Увеличить количество товаров на 1
			const newCount = count + 1;
			this._updateProductValues({ productId, newCount, price });

			// Обновить данные компонента Basket
			this._totalCount += 1;
			this._subtotalCost += price;
			this._basket.updateCostAndCount({
				totalCount: this._totalCount,
				subtotalCost: this._subtotalCost,
			});
		}
	}

	/**
	 * Обработать клик на кнопку уменьшения количества товаров
	 * @param {number} productId - идентификатор товара
	 */
	_handleMinusButtonClick(productId) {
		const { count, price } = this._ixProductValues[productId];

		// Уменьшить количество товаров на 1
		if (count > 1) {
			const newCount = count - 1;
			this._updateProductValues({ productId, newCount, price });
		} else if (count === 1) {
			this._ixProductElements[productId].count.closest('.products__item').remove();
		}

		// Обновить данные компонента Basket
		this._totalCount -= 1;
		this._subtotalCost -= price;
		this._basket.updateCostAndCount({
			totalCount: this._totalCount,
			subtotalCost: this._subtotalCost,
		});
	}

	/**
	 * Обработать клик на кнопку закрытия
	 * @param {Object} options - опции
	 * @param {number} options.productId - идентификатор продукта
	 * @param {Event} options.evt - объект события
	 */
	_handleCloseButtonClick({ productId, evt }) {
		const { price, count } = this._ixProductValues[productId];

		// Обновить данные компонента Basket
		this._totalCount -= count;
		this._subtotalCost -= price * count;
		this._basket.updateCostAndCount({
			totalCount: this._totalCount,
			subtotalCost: this._subtotalCost,
		});

		// Очистить данные и удалить элемент
		this._ixProductValues[productId].count = 0;
		evt.currentTarget.remove();
	}

	/**
	 * Отформатировать стоимость продукта для разметки
	 * @param {number} productCost - стоимость продукта
	 */
	_formatCost(productCost) {
		return `$ ${utils.formatNumber(productCost)}`;
	}

	/**
	 * Обновить значения товара
	 * @param {Object} values - значения товара
	 * @param {number} values.productId - идентификатор товара
	 * @param {number} values.newCount - обновлённое количество товаров
	 * @param {number} values.price - цена товара
	 */
	_updateProductValues({ productId, newCount, price }) {
		this._ixProductValues[productId].count = newCount;
		this._ixProductElements[productId].count.textContent = newCount;
		this._ixProductElements[productId].cost.textContent = this._formatCost(price * newCount);
	}
}

export default Products;
