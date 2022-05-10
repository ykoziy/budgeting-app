import DeleteModal from './DeleteModal';
import AddModal from './AddModal';
import EditModal from './EditModal';

class ModalFactory {
  createModal(type, data, category, categoryID, callback) {
    if (type === 'add') {
      return new AddModal(data, category, categoryID, callback);
    } else if (type === 'edit') {
      return new EditModal(data, category, categoryID);
    } else if (type === 'delete') {
      return new DeleteModal(data, category, categoryID, callback);
    }
    return null;
  }
}

export default ModalFactory;
