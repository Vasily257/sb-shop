class Tooltip {
	/**
	 * Создать экземпляр Tooltip, который будет управлять всплывающими подсказками
	 * @param {Object} props - параметры
	 * @param {string} props.button - селектор кнопки, которые управляет показом подсказки
	 * @param {string} props.tooltip - селектор подсказки
	 * @constructor
	 */
	constructor(props) {
		/**
		 * Ссылка на элемент подсказки
		 * @type {HTMLElement}
		 */
		this._tooltipElement = document.querySelector(props.tooltip);

		/**
		 * Ссылка на элемент кнопки
		 * @type {HTMLElement}
		 */
		this._buttonElement = document.querySelector(props.button);

		/**
		 * Класс для отображения элемента подсказки
		 * @type {string}
		 */
		this._shownClass = 'tooltip_shown';

		/**
		 * Обработчик клика на кнопку
		 * @type {Function}
		 */
		this._clickButtonHandler = null;

		/**
		 * Обработчик клика вне элемента подсказки
		 * @type {Function}
		 */
		this._clickOutsideHandler = null;
	}

	/** Инициализировать компонент */
	init() {
		this._addButtonClickListener();
	}

	/** Добавить слушатель клика на кнопку */
	_addButtonClickListener() {
		this._clickButtonHandler = this._showTooltip.bind(this);
		this._buttonElement.addEventListener('click', this._clickButtonHandler);
	}

	/** Отобразить элемент подсказки */
	_showTooltip() {
		this._tooltipElement.classList.add(this._shownClass);

		this._addOutsideClickListener();
		this._removeButtonClickListener();
	}

	/** Удалить слушатель клика на кнопку */
	_removeButtonClickListener() {
		this._buttonElement.removeEventListener('click', this._clickButtonHandler);
		this._clickButtonHandler = null;
	}

	/** Добавить слушатель клика вне подсказки */
	_addOutsideClickListener() {
		this._clickOutsideHandler = this._hideTooltip.bind(this);
		document.addEventListener('click', this._clickOutsideHandler);
	}
	/**
	 * Скрыть элемент подсказки
	 * @param {Event} evt - событие
	 */
	_hideTooltip(evt) {
		const isNotButtonAndTooltip =
			evt.target !== this._buttonElement && evt.target !== this._tooltipElement;

		if (isNotButtonAndTooltip) {
			this._tooltipElement.classList.remove(this._shownClass);

			this._removeOutsideClickListener();
			this._addButtonClickListener();
		}
	}

	/** Удалить слушатель клика вне подсказки */
	_removeOutsideClickListener() {
		document.removeEventListener('click', this._clickOutsideHandler);
		this._clickOutsideHandler = null;
	}
}

export default Tooltip;
