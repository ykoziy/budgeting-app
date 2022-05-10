import Modal from './modal';
import DOM from '../domutil';

class AddModal extends Modal {
  constructor(data, category, categoryID, callback) {
    super(data, category, categoryID, callback);
  }

  #onAddClick(categoryName, itemName, dollarAmount) {
    this.callback(categoryName, itemName, dollarAmount);
  }

  create() {
    const modal = DOM.createElement('div', 'modal');

    const modalForm = DOM.createElement('form', 'modal-top');
    const modalBottom = DOM.createElement('div', 'modal-bottom');

    modal.append(modalForm);

    const labelCat = DOM.createElement('label');
    labelCat.innerText = 'Category:';
    labelCat.setAttribute('for', 'category-name');

    const labelName = DOM.createElement('label');
    labelName.innerText = 'Name:';
    labelName.setAttribute('for', 'name');

    const labelDollarAmount = DOM.createElement('label');
    labelDollarAmount.innerText = 'Amount $:';
    labelDollarAmount.setAttribute('for', 'dollar-amount');

    const categoryInput = DOM.createElement('input', null, 'category-name');
    categoryInput.setAttribute('type', 'text');

    const nameInput = DOM.createElement('input', null, 'name');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('required', true);

    const dollarAmountInput = DOM.createElement('input', null, 'dollar-amount');
    dollarAmountInput.setAttribute('type', 'number');
    dollarAmountInput.setAttribute('step', '0.01');
    dollarAmountInput.setAttribute('required', true);

    const modalTitle = DOM.createElement('h1');

    if (this.currentView === 'expense') {
      modalTitle.innerText = 'Adding expense';
      modalForm.append(
        modalTitle,
        labelCat,
        categoryInput,
        labelName,
        nameInput,
        labelDollarAmount,
        dollarAmountInput,
      );
    } else {
      modalTitle.innerText = 'Adding income';
      modalForm.append(
        modalTitle,
        labelName,
        nameInput,
        labelDollarAmount,
        dollarAmountInput,
      );
    }

    const cancelButton = DOM.createElement('button', 'cancel-btn');
    cancelButton.setAttribute('type', 'button');
    cancelButton.innerText = 'Cancel';

    let addButton = DOM.createElement('button', 'add-btn');
    addButton.setAttribute('value', 'add');
    addButton.innerText = 'Add';

    addButton.setAttribute('type', 'submit');

    modalForm.addEventListener('submit', (evt) => {
      if (modalForm.checkValidity()) {
        evt.preventDefault;
        this.#onAddClick(
          categoryInput.value,
          nameInput.value,
          dollarAmountInput.value,
        );
      }
    });

    modalBottom.append(cancelButton, addButton);
    modalForm.append(modalBottom);
    return modal;
  }
}

export default AddModal;
