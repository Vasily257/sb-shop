import Validator from './Validator';
import Tooltip from './Tooltip';

class CreditCard {
	/**
	 * Создать экземпляр CreditCard, который обрабатывает инпуты карты
	 * @constructor
	 */
	constructor() {
		/**
		 * Корневной элемент компонента
		 * @type {HTMLElement}
		 */
		this._rootElement = document.querySelector('.credit-card');

		/**
		 * Объединённый инпут номера карты, который скрыт в разметке
		 * @type {HTMLElement}
		 */
		this._unitedCardInput = this._rootElement.querySelector('#card-number-united-id');

		/**
		 * Инпуты номера карты без объединённого инпута
		 * @type {Array<HTMLElement>}
		 */
		this._cardNumberInputElements = [];

		/**
		 * Объект для валидации значений
		 * @type {Validator}
		 */
		this._validator = new Validator();

		/**
		 * Объект для управление тултипом
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

		this._tooltip.init();
	}

	/** Перебрать инпуты компонента */
	_iterateInputs() {
		const inputElements = this._rootElement.querySelectorAll('input');

		for (let i = 0; i < inputElements.length; i++) {
			const inputElement = inputElements[i];

			this._setEventListener(inputElement);
			this._updateCardNumberInputList(inputElement);
		}
	}

	/**
	 * Добавить слушателя событий
	 * @param {HTMLElement} - элемент инпута
	 */
	_setEventListener(inputElement) {
		this._inputHandler = this._handleInput.bind(this);

		inputElement.addEventListener('input', this._inputHandler);

		if (module.hot) {
			module.hot.dispose(() => {
				inputElement.removeEventListener('input', this._inputHandler);
			});
		}
	}

	/**
	 * Обработать событие ввода
	 * @param {Event} evt - объект события
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
	 * Проверить, относится ли инпут к номеру карты (объединённый инпут не учитывается)
	 * @param {string} inputId - id инпута
	 */
	_checkCardNumberInput(inputId) {
		return /card-number-(one|two|three|four)/.test(inputId);
	}

	/**
	 * Переместить фокус на следующий или предыдущий инпут
	 * @param {Event} evt - объект события
	 */
	_manageFocus(evt) {
		const currentItem = evt.target.closest('.credit-card__item');

		this._swithFocusBack(currentItem);
		this._swithFocusForward(currentItem);
	}

	/**
	 * Переместить фокус на предыдущий инпут, если он не заполнен полностью
	 * @param {HTMLElement} currentItem - текущий элемент списка, в котором находится инпут
	 */
	_swithFocusBack(currentItem) {
		// Найти элементы и максимальную длину ввода
		const currentInput = currentItem.querySelector('input');
		const previousItem = currentItem.previousElementSibling;
		const previousInput = previousItem.querySelector('input');
		const maxLength = Number(previousInput.getAttribute('maxlength'));

		const isNotInputFull = previousInput.value.length < maxLength;
		const isFirstInput = previousInput.id === 'name-on-card-id';

		const totalLength = previousInput.value.length + currentInput.value.length;
		const isNotExceedMaxlength = totalLength <= maxLength;

		// Проверить, что предыдущий инпут не заполнен полностью,
		// и что новое значение инпута не будет превышать максимальную длину
		if (isNotInputFull && isNotExceedMaxlength) {
			// Проверить, что мы не достигли первого инпута
			if (isFirstInput) {
				return;
			}

			// Перенести значение текущего инпута в предыдущий инпут,
			// а затем очистить значение текущего инпута
			previousInput.value += currentInput.value;
			currentInput.value = '';

			// Переместить фокус на предыдущий инпут
			previousInput.focus();

			// Запустить функцию рекурсивно
			this._swithFocusBack(previousItem);
		}
	}

	/**
	 * Переместить фокус на следующий инпут, если текущий полностью заполнен
	 * @param {HTMLElement} currentItem - текущий элемент списка, в котором находится инпут
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
	 * Обработать событие ввода на инпуте даты
	 * @param {Event} evt - объект события
	 */
	_handleExpireDateInput(evt) {
		this._validator.checkElementValidity({
			element: evt.target,
			errorMessage: 'Please enter the date in the following format: MM/YY',
		});

		this._manageDateSeparatorDisplay(evt);
	}

	/**
	 * Подставить или убрать разделитель даты
	 * @param {Event} evt - объект события
	 */
	_manageDateSeparatorDisplay(evt) {
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
	 * Добавить инпут в список инпутов номера карты, если он относится к ним
	 * @param {HTMLElement} currentInputElement - текущий инпут
	 */
	_updateCardNumberInputList(currentInputElement) {
		const isCardNumber = this._checkCardNumberInput(currentInputElement.id);

		if (isCardNumber) {
			this._cardNumberInputElements.push(currentInputElement);
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
