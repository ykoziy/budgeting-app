import Modal from './modal';
import DOM from '../domutil';

class EditCategoryModal extends Modal {
  constructor(data, category, categoryID, callback) {
    super(data, category, categoryID);
    this.callback = callback;
  }

  #onItemSave(itemID, categoryName) {
    this.callback(itemID, categoryName);
  }

  create() {
    const modal = DOM.createElement('div', 'modal');

    const modalForm = DOM.createElement('form', 'modal-top');
    const modalBottom = DOM.createElement('div', 'modal-bottom');

    modal.append(modalForm);

    const labelCat = DOM.createElement('label');
    labelCat.innerText = 'Category:';
    labelCat.setAttribute('for', 'category-name');

    const categoryInput = DOM.createElement('input', null, 'category-name');
    categoryInput.setAttribute('type', 'text');

    const modalTitle = DOM.createElement('h1');
    modalTitle.innerText = 'Editing category';

    categoryInput.value = this.data.category;
    modalForm.append(modalTitle, labelCat, categoryInput);

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
        this.#onItemSave(this.data.id, categoryInput.value);
      }
    });

    modalBottom.append(cancelButton, addEditButton);
    modalForm.append(modalBottom);
    return modal;
  }
}

export default EditCategoryModal;
