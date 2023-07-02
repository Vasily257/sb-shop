/** Создать экземпляр Validator, который будет валидировать значения */
class Validator {
	/** Проверить валидность элемента
	 * @param {Object} props - параметры
	 * @param {HTMLElement} props.element - валидируемый элемент
	 * @param {string} props.errorMessage - сообщение об ошибке
	 */
	checkElementValidity({ element, errorMessage }) {
		const { validity } = element;
		const { badInput, patternMismatch, tooLong, tooShort, typeMismatch, valueMissing } = validity;

		const isCustomValid =
			!badInput && !patternMismatch && !tooLong && !tooShort && !typeMismatch && !valueMissing;

		if (isCustomValid) {
			element.setCustomValidity('');
		} else {
			element.setCustomValidity(errorMessage);
			element.reportValidity();
		}
	}
}

export default Validator;
