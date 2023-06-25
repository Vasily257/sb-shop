import Subject from './Subject';

class Basket extends Subject {
	/**
	 * Создать экземпляр Basket, который наследует Subject
	 * @constructor
	 */
	constructor() {
		super();

		/**
		 * Промежуточная стоимость всех товаров
		 * @type {number}
		 */
		this._subtotalCost = 0;
	}

	/**
	 * Обновить промежуточную стоимость всех товаров
	 * @param {number} newSubtotalCost - новая промежуточная стоимость всех товаров
	 */
	updateSubtotalCost(newSubtotalCost) {
		this._subtotalCost = newSubtotalCost;

		this._notifyObservers();
	}
}

export default Basket;
