class Products {
	constructor() {
		/**
		 * Товары, сортированные по id
		 * @type {Record<number, {id: number, count: number,  price: number}>}
		 */
		this.products = {};

		/**
		 * Промежуточная стоимость всех товаров
		 * @type {number}
		 */
		this.subtotalCost = 0;

		/**
		 * Карточки товаров
		 * @type {NodeListOf<HTMLElement>}
		 */
		this.productItems = document.querySelectorAll('.products__item');
	}

	/**
	 * Увеличить количество товаров на 1
	 * @param {number} id - идентификатор товара
	 */
	_incrementProductCount(id) {
		let productCount = this.products[id].count;

		if (!productCount) {
			productCount = 0;
		}

		// Ограничить количество добавляемых товаров
		if (productCount < 20) {
			productCount += 1;
		}
	}

	/**
	 * Уменьшить количество товаров на 1
	 * @param {number} id - идентификатор товара
	 */
	_decrementProductCount(id) {
		let productCount = this.products[id].count;

		if (productCount && productCount > 0) {
			productCount -= 1;
		}
	}

	/** Добавить слушателей событий */
	_setEventListeners() {
		for (let i = 0; i < this.productItems.length; i++) {
			const productItem = this.productItems[i];
			const productItemId = productItem.getAttribute('data-id');

			// Добавить обработчик клика для элемента товара
			productItem.addEventListener('click', evt => {
				const parentElement = evt.target.parentNode;

				if (parentElement.classList.contains('products__button_type_plus')) {
					this._incrementProductCount(productItemId);
				}

				if (parentElement.classList.contains('products__button_type_minus')) {
					this._decrementProductCount(productItemId);
				}

				if (parentElement.classList.contains('products__button_type_close')) {
					console.log('Закрыть');
				}
			});
		}
	}

	/** Инициализировать компонент */
	init() {
		this._setEventListeners();
	}
}
export default Products;
