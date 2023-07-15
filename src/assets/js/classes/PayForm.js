// eslint-disable-next-line no-unused-vars
import CreditCard from './CreditCard';

class PayForm {
	/**
	 * Создать экземпляр PayForm, который работает с формой отправки платежных данных
	 * @constructor
	 * @param {CreditCard} creditCard - экземпляр CreditCard, в котором находятся платежные данные
	 */
	constructor(creditCard) {
		/**
		 * Корневной элемент компонента
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
		this._submitHandler = this._handleSubmit.bind(this);

		this._rootElement.addEventListener('submit', this._submitHandler);

		if (module.hot) {
			module.hot.dispose(() => {
				this._rootElement.removeEventListener('submit', this._submitHandler);
			});
		}
	}

	/**
	 * Обработать событие ввода
	 * @param {Event} evt - объект события
	 */
	_handleSubmit() {
		this._creditCard.updateUnitedCardInput();

		// Отправить данные на сервер (выполнить действие по умолчанию)
		return true;
	}
}

export default PayForm;
