import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import React Router's useNavigate
import { getItems,deleteItem,createItem } from '../api'; // Your API function
import Modalbox from "../components/Modal"
const Home = () => {
  const [items, setItems] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const navigate = useNavigate(); // Use navigate for routing

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await getItems();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteItem(id);
      fetchItems(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const openDeleteModal = (id) => {
    setItemToDelete(id); // Set the item to be deleted
    setShowDeleteModal(true); // Show the modal
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setItemToDelete(null); // Reset the item to delete
  };

  return (
    <div>
      <Button variant="primary" onClick={() => navigate('/feed')}>Create Item</Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.image ? <img src={item.image} alt="Item" width={50} height={50} /> : 'No Image'}</td>
              <td>
                <Button variant="warning" onClick={() => navigate(`/feed/${item.id}`)}>
                  Update
                </Button>{' '}
                <Button variant="danger" onClick={() => openDeleteModal(item.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Delete Confirmation Modal */}
      <Modalbox
        show={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteItem}
        itemId={itemToDelete}
      />
    </div>
  );
};

export default Home;
