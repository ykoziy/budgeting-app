import DeleteModal from './DeleteModal';
import AddModal from './AddModal';

class ModalFactory {
  createModal(type, data, category, categoryID) {
    if (type === 'add' || type === 'edit') {
      return new AddModal();
    } else if (type === 'delete') {
      return new DeleteModal();
    }
    return null;
  }
}

export default ModalFactory;
