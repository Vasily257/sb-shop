import utils from '../utils/utils';
import Observer from './Observer';

class TotalCost extends Observer {
	/**
	 * Создать экземпляр TotalCost, который управляет разделом со стоимостями и наследуется от Observer
	 * @param {Subject} subject - экземпляр объекта наблюдения (Basket)
	 * @constructor
	 */
	constructor(subject) {
		super(subject);

		/**
		 * Корневной элемент компонента
		 * @type {HTMLElement}
		 */
		this._rootElement = document.querySelector('.total-cost');

		/**
		 * Статические стоимости, которые не зависят от количества товара
		 * @type {number}
		 */
		this._staticCosts = 0;
	}

	/** Инициализировать компонент */
	init() {
		this._subject.addObserver(this);

		this._getInitialDataFromMarkup();
	}

	/** Получить исходную информацию из разметки */
	_getInitialDataFromMarkup() {
		const root = this._rootElement;

		const taxContent = root.querySelector('.total-cost__item-value_type_tax').textContent;
		const shippingContent = root.querySelector('.total-cost__item-value_type_shipping').textContent;

		const tax = utils.parseStringAsNumber(taxContent);
		const shipping = utils.parseStringAsNumber(shippingContent);

		this._staticCosts = tax + shipping;
	}

	/** Обновить данные наблюдателя */
	update() {
		this._updateTotalCost(this._subject.subtotalCost);
	}

	/**
	 * Обновить итоговую стоимость
	 * @param {number} subtotal - промежуточная стоимость
	 */
	_updateTotalCost(subtotal) {
		const totalCost = subtotal + this._staticCosts;

		const root = this._rootElement;
		const subtotalElement = root.querySelector('.total-cost__item-value_type_subtotal');
		const totalElement = root.querySelector('.total-cost__item-value_type_total');

		subtotalElement.textContent = `$${utils.formatNumber(subtotal)}`;
		totalElement.textContent = `$${utils.formatNumber(totalCost)}`;
	}
}

export default TotalCost;
