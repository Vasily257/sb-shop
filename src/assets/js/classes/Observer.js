// eslint-disable-next-line no-unused-vars
import Subject from './Subject';

class Observer {
	/**
	 * Создать экземпляр Observer, который наблюдает за Subject
	 * @constructor
	 * @param {Subject} subject - объект наблюдения
	 */
	constructor(subject) {
		/**
		 * Объект наблюдения
		 * @type {Subject}
		 */
		this._subject = subject;
	}
	/** Обновить данные наблюдателя */
	update() {
		console.log('This is a subject with changed data:', this._subject);
	}
}

export default Observer;
