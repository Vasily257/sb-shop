class Subject {
	/**
	 * Создать экземпляр Subject, за которым следят наблюдатели
	 * @constructor
	 */
	constructor() {
		/**
		 * Список наблюдателей
		 * @type {Array}
		 */
		this._observers = [];
	}

	/**
	 * Добавить наблюдателя
	 * @param observer - наблюдатель
	 */
	addObserver(observer) {
		const isNotExist = !this._observers.includes(observer);

		if (isNotExist) {
			this._observers.push(observer);
		}
	}

	/**
	 * Удалить наблюдателя
	 * @param observer - наблюдатель
	 */
	removeObserver(observer) {
		this._observers = this._observers.filter(iteratedObserver => iteratedObserver !== observer);
	}

	/** Уведомить наблюдателей об изменении свойств субъекта */
	_notifyObservers() {
		for (let i = 0; i < this._observers.length; i++) {
			const observer = this._observers[i];

			observer.update(this);
		}
	}
}

export default Subject;
