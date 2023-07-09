// eslint-disable-next-line no-unused-vars
import CreditCard from './CreditCard';

class PayForm {
	/**
	 * Создать экземпляр PayForm, который работает с формой отправки платежных данных
	 * @constructor
	 * @param {CreditCard} creditCard - экземпляр CreditCard
	 */
	constructor(creditCard) {
		/**
		 * Корневной HTML-элемент компонента
		 * @type {HTMLElement}
		 */
		this._rootElement = document.querySelector('.pay-form');

		/**
		 * Экземпляр CreditCard
		 * @type {CreditCard}
		 */
		this._creditCard = creditCard;
	}

	/** Инициализировать компонент */
	init() {
		this._setEventListener();
	}

	/** Добавить слушателя событий */
	_setEventListener() {
		this._rootElement.addEventListener('submit', this._handleSubmit.bind(this));
	}

	/**
	 * Обработать событие ввода
	 * @param {Event} evt - событие
	 */
	_handleSubmit() {
		this._creditCard.updateUnitedCardInput();

		// Разрешить выполнить действие по умолчанию
		return true;
	}
}

export default PayForm;
