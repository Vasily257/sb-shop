class Tooltip {
	/**
	 * Создать экземпляр Tooltip, который управляет тултипами
	 * @param {Object} params - параметры
	 * @param {string} params.button - селектор кнопки, который управляет показом тултипа
	 * @param {string} params.tooltip - селектор тултипа
	 * @constructor
	 */
	constructor(params) {
		/**
		 * Элемент тултипа
		 * @type {HTMLElement}
		 */
		this._tooltipElement = document.querySelector(params.tooltip);

		/**
		 * Элемент кнопки
		 * @type {HTMLElement}
		 */
		this._buttonElement = document.querySelector(params.button);

		/**
		 * БЭМ-модификатор для отображения тултипа
		 * @type {string}
		 */
		this._shownClass = 'tooltip_visibility_shown';

		/**
		 * Обработчик клика на кнопку
		 * @type {Function}
		 */
		this._clickButtonHandler = null;

		/**
		 * Обработчик клика на область вне тултипа
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

	/** Отобразить тултип */
	_showTooltip() {
		this._tooltipElement.classList.add(this._shownClass);

		this._removeButtonClickListener();

		// Добавить задержку, чтобы разделить клики на кнопку,
		// иначе два обработчика срабатывают одновременно, и тултип сразу скрывается
		setTimeout(() => {
			this._addOutsideClickListener();
		}, 100);
	}

	/** Удалить слушатель клика на кнопку */
	_removeButtonClickListener() {
		this._buttonElement.removeEventListener('click', this._clickButtonHandler);
		this._clickButtonHandler = null;
	}

	/** Добавить слушатель клика на область вне тултипа */
	_addOutsideClickListener() {
		this._clickOutsideHandler = this._hideTooltip.bind(this);
		document.addEventListener('click', this._clickOutsideHandler);
	}
	/**
	 * Скрыть тутлип
	 * @param {Event} evt - объект события
	 */
	_hideTooltip(evt) {
		const isNotTooltip = evt.target !== this._tooltipElement;

		if (isNotTooltip) {
			this._tooltipElement.classList.remove(this._shownClass);

			this._removeOutsideClickListener();
			this._addButtonClickListener();
		}
	}

	/** Удалить слушатель клика на область вне тултипа */
	_removeOutsideClickListener() {
		document.removeEventListener('click', this._clickOutsideHandler);
		this._clickOutsideHandler = null;
	}
}

export default Tooltip;
