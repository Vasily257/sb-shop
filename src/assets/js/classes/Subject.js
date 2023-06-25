/**
 * @typedef {Object} Observer
 * @property {Function} update - функция, которая обновляет состояние наблюдателя
 */

class Subject {
	/**
	 * Создать экземпляр Subject, за которым будут следить наблюдатели
	 * @constructor
	 */
	constructor() {
		/**
		 * Список наблюдателей
		 * @type {Array<Observer>}
		 */
		this._observers = [];
	}

	/**
	 * Добавить наблюдателя
	 * @param {Observer} observer - наблюдатель
	 */
	addObserver(observer) {
		const isNotExist = !this._observers.includes(observer);

		if (isNotExist) {
			this.observers.push(observer);
		}
	}

	/**
	 * Удалить наблюдателя
	 * @param {Observer} observer - наблюдатель
	 */
	removeObserver(observer) {
		this.observers = this.observers.filter(iteratedObserver => iteratedObserver !== observer);
	}

	/** Уведомить наблюдателей об изменении свойств */
	_notifyObservers() {
		for (let i = 0; i < this._observers.length; i++) {
			const observer = this._observers[i];

			observer.update(this);
		}
	}
}

export default Subject;
