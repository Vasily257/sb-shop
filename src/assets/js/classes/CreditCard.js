import Validator from './Validator';
import Tooltip from './Tooltip';

class CreditCard {
	/**
	 * Создать экземпляр CreditCard, который работает с полями ввода карты
	 * @constructor
	 */
	constructor() {
		/**
		 * Корневной HTML-элемент компонента
		 * @type {HTMLElement}
		 */
		this._rootElement = document.querySelector('.credit-card');

		/**
		 * Объект для валидации значений
		 * @type {Validator}
		 */
		this._validator = new Validator();

		/**
		 * Объект для управление подсказкой
		 * @type {Tooltip}
		 */
		this._tooltip = new Tooltip({
			button: '.credit-card__tooltip-button',
			tooltip: '.credit-card__tooltip',
		});
	}

	/** Инициализировать компонент */
	init() {
		this._setEventListeners();
		this._tooltip.init();
	}

	/** Добавить слушателей событий */
	_setEventListeners() {
		const inputElements = this._rootElement.querySelectorAll('input');

		for (let i = 0; i < inputElements.length; i++) {
			const inputElement = inputElements[i];
			inputElement.addEventListener('input', this._handleInput.bind(this));
		}
	}

	/**
	 * Обработать событие ввода
	 * @param {Event} evt - событие
	 */
	_handleInput(evt) {
		const { inputMode, id } = evt.target;

		const isCardOnName = id === 'name-on-card-id';
		const isCardNumber = /card-number/.test(id);
		const isNumericMode = inputMode === 'numeric';
		const isExpireDate = id === 'expire-date-id';

		if (isCardOnName) {
			this._validator.checkElementValidity({
				element: evt.target,
				errorMessage: 'Only letters (A-Z, a-z), spaces, hyphens, and apostrophes are allowed',
			});
		}

		if (isNumericMode) {
			this._validator.checkElementValidity({
				element: evt.target,
				errorMessage: 'Only numbers are allowed',
			});
		}

		if (isCardNumber) {
			this._manageFocus(evt);
		}

		if (isExpireDate) {
			this._handleExpireDateInput(evt);
			this._swithFocusForward(evt.target.closest('.credit-card__item'));
		}
	}

	/**
	 * Обработать событие ввода на поле ввода даты
	 * @param {Event} evt - событие
	 */
	_handleExpireDateInput(evt) {
		this._validator.checkElementValidity({
			element: evt.target,
			errorMessage: 'Please enter the date in the following format: MM/YY',
		});

		this._addNumberSeparator(evt);
	}

	/**
	 * Подставить и убрать разделитель даты
	 * @param {Event} evt - событие
	 */
	_addNumberSeparator(evt) {
		const { value } = evt.target;

		if (evt.inputType === 'insertText') {
			if (value.length === 2) {
				evt.target.value = value + `/`;
			}

			if (value.length === 3) {
				evt.target.value = value[0] + value[1] + '/' + value[2];
			}
		}

		if (evt.inputType === 'deleteContentBackward') {
			if (value.length === 2) {
				evt.target.value = evt.target.value.slice(0, -1);
			}

			if (value.length === 3) {
				evt.target.value = value[0] + value[1] + '/';
			}
		}
	}

	/**
	 * Переместить фокус вперед или назад
	 * @param {Event} evt - событие
	 */
	_manageFocus(evt) {
		const currentItem = evt.target.closest('.credit-card__item');

		this._swithFocusBack(currentItem);
		this._swithFocusForward(currentItem);
	}

	/**
	 * Переместить фокус на предыдущий инпут, если он не заполнен полностью
	 * @param {HTMLElement} currentItem - текущий элемент списка
	 */
	_swithFocusBack(currentItem) {
		console.log(currentItem);

		// Найти элементы и максимальную длину ввода
		const currentInput = currentItem.querySelector('input');
		const previousItem = currentItem.previousElementSibling;
		const previousInput = previousItem.querySelector('input');
		const maxLength = Number(previousInput.getAttribute('maxlength'));

		if (previousInput.value < maxLength) {
			// Проверить, что мы не достигли первого поля ввода
			if (previousInput.id === 'name-on-card-id') {
				return;
			}

			// Перенести значение текущего поля ввода и очистить его
			previousInput.value = currentInput.value;
			currentInput.value = '';

			// Переместить фокус на предыдущее поле ввода
			previousInput.focus();

			// Запустить функцию рекурсивно
			this._swithFocusBack(previousItem);
		}
	}

	/**
	 * Переместить фокус на следующий инпут, если текущий полностью заполнен
	 * @param {HTMLElement} currentItem - текущий элемент списка (не ипут)
	 */
	_swithFocusForward(currentItem) {
		const currentInput = currentItem.querySelector('input');
		const nextItem = currentItem.nextElementSibling;
		const nextInput = nextItem.querySelector('input');
		const maxLength = Number(currentInput.getAttribute('maxlength'));

		const isInputFull = currentInput.value.length === maxLength;
		const isNotLastItem = nextItem.id !== 'cvv-code-id';

		if (isInputFull && isNotLastItem) {
			nextInput.focus();
		}
	}
}

export default CreditCard;
