import Observer from './Observer';

class TotalCost extends Observer {
	constructor(subject) {
		super(subject);

		this._subtotalCost = 0;
	}

	/** Инициализировать компонент */
	init() {
		this._subject.addObserver(this);
	}

	/** Обновить данные наблюдателя */
	update() {
		this._subtotalCost = this._subject.subtotalCost;
	}
}

export default TotalCost;
