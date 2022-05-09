import Modal from './modal';
import DOM from '../domutil';

class DeleteModal extends Modal {
  constructor(data, category, categoryID) {
    super(data, category, categoryID);
  }

  create() {
    const modal = DOM.createElement('div', 'modal');

    const modalForm = DOM.createElement('form', 'modal-top');
    const modalBottom = DOM.createElement('div', 'modal-bottom');
    modal.append(modalForm);

    const confirmationMsg = DOM.createElement('p');
    confirmationMsg.innerText = 'Are you sure you want to delete?';

    modalForm.append(confirmationMsg);

    const cancelButton = DOM.createElement('button', 'cancel-btn');
    cancelButton.setAttribute('type', 'button');
    cancelButton.innerText = 'Cancel';

    const yesBtn = DOM.createElement('button', 'yes-btn');
    yesBtn.setAttribute('value', 'delete');
    yesBtn.setAttribute('type', 'submit');
    yesBtn.dataset.id = this.data.id;
    yesBtn.dataset.categoryId = this.categoryID;
    yesBtn.innerText = 'Yes';

    modalBottom.append(cancelButton, yesBtn);
    modalForm.append(modalBottom);
    return modal;
  }
}

export default DeleteModal;
