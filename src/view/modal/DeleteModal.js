import Modal from './modal';
import DOM from '../domutil';

class DeleteModal extends Modal {
  constructor(data, category, categoryID, callback) {
    super(data, category, categoryID, callback);
  }

  create() {
    const modal = DOM.createElement('div', 'modal');

    const modalForm = DOM.createElement('div', 'modal-top');
    const modalBottom = DOM.createElement('div', 'modal-bottom');
    modal.append(modalForm);
    modal.append(modalBottom);

    const confirmationMsg = DOM.createElement('p');
    confirmationMsg.innerText = 'Are you sure you want to delete?';

    modalForm.append(confirmationMsg);

    const cancelButton = DOM.createElement('button', 'cancel-btn');
    cancelButton.setAttribute('type', 'button');
    cancelButton.innerText = 'Cancel';

    const yesBtn = DOM.createElement('button', 'yes-btn');
    yesBtn.setAttribute('type', 'button');
    yesBtn.innerText = 'Yes';
    yesBtn.addEventListener('click', (evt) => {
      this.callback();
    });

    modalBottom.append(cancelButton, yesBtn);
    return modal;
  }
}

export default DeleteModal;
