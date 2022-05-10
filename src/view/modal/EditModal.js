import Modal from './modal';
import DOM from '../domutil';

class EditModal extends Modal {
  constructor(data, category, categoryID, callback) {
    super(data, category, categoryID);
    this.callback = callback;
  }

  #onItemSave(itemID, categoryName, itemName, dollarAmount) {
    this.callback(itemID, categoryName, itemName, dollarAmount);
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
      modalTitle.innerText = 'Editing expense';
      categoryInput.value = this.category;
      nameInput.value = this.data.title;
      dollarAmountInput.value = this.data.money;
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
      modalTitle.innerText = 'Editing income';
      nameInput.value = this.data.title;
      dollarAmountInput.value = this.data.money;
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

    let addEditButton = DOM.createElement('button', 'save-btn');
    addEditButton.setAttribute('value', 'edit');
    addEditButton.innerText = 'Save';
    addEditButton.setAttribute('type', 'submit');

    modalForm.addEventListener('submit', (evt) => {
      if (modalForm.checkValidity()) {
        evt.preventDefault();
        this.#onItemSave(
          this.data.id,
          categoryInput.value,
          nameInput.value,
          dollarAmountInput.value,
        );
      }
    });

    modalBottom.append(cancelButton, addEditButton);
    modalForm.append(modalBottom);
    return modal;
  }
}

export default EditModal;
