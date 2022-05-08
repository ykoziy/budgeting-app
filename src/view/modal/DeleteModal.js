import Modal from './modal';
import DOM from '../domutil';

class DeleteModal extends Modal {
  constructor() {
    super();
  }

  create() {
    const modal = DOM.createElement('div', 'modal');

    const modalTop = DOM.createElement('div', 'modal-top');
    const modalBottom = DOM.createElement('div', 'modal-bottom');
    modal.append(modalTop);
    modal.append(modalBottom);

    const confirmationMsg = DOM.createElement('p');
    confirmationMsg.innerText = 'Are you sure you want to delete?';

    modalTop.append(confirmationMsg);

    const cancelButton = DOM.createElement('button', 'cancel-btn');
    cancelButton.innerText = 'Cancel';

    const yesBtn = DOM.createElement('button', 'yes-btn');
    yesBtn.innerText = 'Yes';

    modalBottom.append(cancelButton, yesBtn);
    return modal;
  }
}

export default DeleteModal;
