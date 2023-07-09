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
		 * Объединённый ипнут номера карты, который скрыт
		 * @type {HTMLElement}
		 */
		this._unitedCardInput = this._rootElement.querySelector('#card-number-united-id');

		/**
		 * HTML-элементы инпутов с номером карты (объединённый ипнут не учитывается)
		 * @type {Array<HTMLElement>}
		 */
		this._cardNumberInputElements = [];

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
		this._iterateInputs();
		this._addAutocompleteTracking();

		this._tooltip.init();
	}

	/** Перебрать HTML-коллекцию товаров */
	_iterateInputs() {
		const inputElements = this._rootElement.querySelectorAll('input');

		for (let i = 0; i < inputElements.length; i++) {
			const inputElement = inputElements[i];

			this._setEventListener(inputElement);
			this._addCardNumberInput(inputElement);
		}
	}

	/**
	 * Добавить слушателя событий
	 * @param {HTMLElement} - элемент инпута
	 */
	_setEventListener(inputElement) {
		inputElement.addEventListener('input', this._handleInput.bind(this));
	}

	/**
	 * Обработать событие ввода
	 * @param {Event} evt - событие
	 */
	_handleInput(evt) {
		const { inputMode, id } = evt.target;

		const isCardOnName = id === 'name-on-card-id';
		const isCardNumber = this._checkCardNumberInput(id);
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
	 * Проверить, относится ли инпут к номеру карты (объединённый ипнут не учитывается)
	 * @param {string} inputId - id инпута
	 */
	_checkCardNumberInput(inputId) {
		return /card-number-(one|two|three|four)/.test(inputId);
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
		// Найти элементы и максимальную длину ввода
		const currentInput = currentItem.querySelector('input');
		const previousItem = currentItem.previousElementSibling;
		const previousInput = previousItem.querySelector('input');
		const maxLength = Number(previousInput.getAttribute('maxlength'));

		const isNotInputFull = previousInput.value.length < maxLength;
		const isFirstItem = previousInput.id === 'name-on-card-id';

		const totalLength = previousInput.value.length + currentInput.value.length;
		const isNotExceedMaxlength = totalLength <= maxLength;

		// Проверить, что предыдущее поле ввода не заполнено полностью
		// и что новое значение не будет превышать максимальную длину
		if (isNotInputFull && isNotExceedMaxlength) {
			// Проверить, что мы не достигли первого поля ввода
			if (isFirstItem) {
				return;
			}

			// Перенести значение текущего поля ввода и очистить его
			previousInput.value += currentInput.value;
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
	 * Добавить инпут, который относится к номеру карты
	 * @param {HTMLElement} currentInputElement - текущий инпут
	 */
	_addCardNumberInput(currentInputElement) {
		const isCardNumber = this._checkCardNumberInput(currentInputElement.id);

		if (isCardNumber) {
			this._cardNumberInputElements.push(currentInputElement);
		}
	}

	/** Добавить отслеживание автозаполнения */
	_addAutocompleteTracking() {
		const timerId = setInterval(() => {
			const isUnitedCardNumberFull = this._unitedCardInput.value.length === 16;

			if (isUnitedCardNumberFull) {
				this._updateCardNumberValue();

				clearInterval(timerId);
			}
		}, 100);
	}

	/** Обновить значения инпутов карты при автоподстановке */
	_updateCardNumberValue() {
		const unitedValue = this._unitedCardInput.value;

		for (let i = 0; i < this._cardNumberInputElements.length; i++) {
			const inputElement = this._cardNumberInputElements[i];

			const maxLength = 4;
			const startIndex = i * maxLength;
			const endIndex = (i + 1) * maxLength;

			inputElement.value = unitedValue.substring(startIndex, endIndex);
		}
	}

	/** Заполнить инпут с объединенным номером карты */
	updateUnitedCardInput() {
		for (let i = 0; i < this._cardNumberInputElements.length; i++) {
			const inputElement = this._cardNumberInputElements[i];

			this._unitedCardInput.value += inputElement.value;
		}
	}
}

export default CreditCard;
