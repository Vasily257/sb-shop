class Products {
	constructor() {
		/** Количество товаров, сортированные по id */
		this.productCount = {};

		/** Карточки товаров */
		this.productItems = document.querySelectorAll('.products__item');
	}

	/** Увеличить количество товаров на 1 */
	_incrementProductCount(id) {
		if (!this.productCount[id]) {
			this.productCount[id] = 0;
		}

		// Ограничить количество добавляемых товаров
		if (this.productCount[id] < 20) {
			this.productCount[id] += 1;
		}
	}

	/** Уменьшить количество товаров на 1 */
	_decrementProductCount(id) {
		if (this.productCount[id] && this.productCount[id] > 0) {
			this.productCount[id] -= 1;
		}
	}

	/** Добавить слушателей событий */
	setEventListeners() {
		for (let i = 0; i < this.productItems.length; i++) {
			const productItem = this.productItems[i];
			const productItemID = productItem.getAttribute('data-id');

			// Добавить обработчик клика для элемента товара
			productItem.addEventListener('click', evt => {
				const parentElement = evt.target.parentNode;

				if (parentElement.classList.contains('products__button_type_plus')) {
					this._incrementProductCount(productItemID);
					console.log(this.productCount);
				}

				if (parentElement.classList.contains('products__button_type_minus')) {
					this._decrementProductCount(productItemID);
					console.log(this.productCount);
				}

				if (parentElement.classList.contains('products__button_type_close')) {
					console.log('Закрыть');
				}
			});
		}
	}
}
export default Products;
