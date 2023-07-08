class Badge {
	/**
	 * Создать экземпляр Badge, который будет управлять бейджами
	 * @param {string} badgeSelector - селектор бейджа
	 * @constructor
	 */
	constructor(badgeSelector) {
		/**
		 * Ссылка на элемент бейджа
		 * @type {HTMLElement}
		 */
		this._badgeElement = document.querySelector(badgeSelector);

		/**
		 * Класс для скрытия элемента бейджа
		 * @type {string}
		 */
		this._hiddenClass = 'badge_hidden';

		/**
		 * БЭМ-модификатор, который увеличивает размер бейджа,
		 * если он в роли счетчика, и значение счетчика больше 9
		 * @type {string}
		 */
		this._multiDigitClass = 'badge_digit_multi';
	}

	/** Скрыть бейдж */
	hide() {
		this._badgeElement.classList.add(this._hiddenClass);
	}

	/** Показать бейдж */
	show() {
		this._badgeElement.classList.remove(this._hiddenClass);
	}

	/** Увеличить размер бейджа */
	increaseSize() {
		this._badgeElement.classList.add(this._multiDigitClass);
	}

	/** Уменьшить размер бейджа */
	decreaseSize() {
		this._badgeElement.classList.remove(this._multiDigitClass);
	}

	/** Обновить значение бейджа
	 * @param {string} text - новое значение
	 */
	updateTextContent(text) {
		this._badgeElement.textContent = text;
	}
}

export default Badge;
