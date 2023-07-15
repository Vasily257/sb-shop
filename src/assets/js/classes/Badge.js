class Badge {
	/**
	 * Создать экземпляр Badge, который управляет бейджами
	 * @param {string} badgeSelector - селектор бейджа
	 * @constructor
	 */
	constructor(badgeSelector) {
		/**
		 * Элемент бейджа
		 * @type {HTMLElement}
		 */
		this._badgeElement = document.querySelector(badgeSelector);

		/**
		 * БЭМ-модификатор для скрытия бейджа
		 * @type {string}
		 */
		this._hiddenClass = 'badge_visibility_hidden';

		/**
		 * БЭМ-модификатор, который увеличивает размер бейджа-счетчика,
		 * если значение счетчика больше 9
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
	 * @param {string} text - значение бейджа
	 */
	updateTextContent(text) {
		this._badgeElement.textContent = text;
	}
}

export default Badge;
