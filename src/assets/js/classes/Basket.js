import Subject from './Subject';

class Basket extends Subject {
	/**
	 * Создать экземпляр Basket, который расширяет Subject
	 * @constructor
	 */
	constructor() {
		super();

		/**
		 * Количество всех товаров
		 * @type {number}
		 */
		this.totalCount = 0;

		/**
		 * Промежуточная стоимость всех товаров
		 * @type {number}
		 */
		this.subtotalCost = 0;
	}

	/**
	 * Обновить промежуточную стоимость и количество товаров
	 * @param {Object} data - данные
	 * @param {number} data.totalCount - новое количество всех товаров
	 * @param {number} data.subtotalCost - новая промежуточная стоимость всех товаров
	 */
	updateCostAndCount({ totalCount, subtotalCost }) {
		this.totalCount = totalCount;
		this.subtotalCost = subtotalCost;

		this._notifyObservers();
	}
}

export default Basket;
