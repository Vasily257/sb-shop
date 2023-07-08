import Observer from './Observer';
import Badge from './Badge';

class Header extends Observer {
	/**
	 * Создать экземпляр Header, который расширяет Observer
	 * @param {Basket} subject - экземпляр объекта наблюдения
	 * @constructor
	 */
	constructor(subject) {
		super(subject);

		/**
		 * Корневной HTML-элемент компонента
		 * @type {HTMLElement}
		 */
		this._rootElement = document.querySelector('.header');

		/**
		 * Объект для управление бейджом
		 * @type {Badge}
		 */
		this._badge = new Badge('.header__cart-counter');
	}

	/** Инициализировать компонент */
	init() {
		this._subject.addObserver(this);
	}

	/** Обновить данные наблюдателя */
	update() {
		this._updateTotalCount(this._subject.totalCount);
	}

	/**
	 * Обновить количество всех товаров
	 * @param {number} totalCount - количество всех товаров
	 */
	_updateTotalCount(totalCount) {
		this._badge.updateTextContent(totalCount);

		// Скрыть счетчик, если нет товаров
		if (totalCount === 0) {
			this._badge.hide();
		} else {
			this._badge.show();
		}

		// Скорректировать стили, если значение счетчика двузначное
		if (totalCount > 9) {
			this._badge.increaseSize();
		} else {
			this._badge.decreaseSize();
		}
	}
}

export default Header;
