import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { TextField, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Pantry = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, 'pantryItems'));
      const itemsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(itemsList);
    };

    fetchItems();
  }, []);

  const addItem = async () => {
    if (newItem) {
      await addDoc(collection(db, 'pantryItems'), { name: newItem });
      setNewItem('');
      fetchItems();
    }
  };

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, 'pantryItems', id));
    fetchItems();
  };

  const updateItem = async () => {
    if (editingItem) {
      await updateDoc(doc(db, 'pantryItems', editingItem.id), { name: editingItem.name });
      setEditingItem(null);
      fetchItems();
    }
  };

  const fetchItems = async () => {
    const querySnapshot = await getDocs(collection(db, 'pantryItems'));
    const itemsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setItems(itemsList);
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <TextField
        label="Search Items"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <TextField
        label="New Item"
        variant="outlined"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <Button onClick={addItem} variant="contained" color="primary">
        Add Item
      </Button>
      {editingItem && (
        <>
          <TextField
            label="Edit Item"
            variant="outlined"
            value={editingItem.name}
            onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
          />
          <Button onClick={updateItem} variant="contained" color="secondary">
            Update Item
          </Button>
        </>
      )}
      <List>
        {filteredItems.map(item => (
          <ListItem key={item.id}>
            <ListItemText primary={item.name} />
            <IconButton onClick={() => deleteItem(item.id)}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => setEditingItem(item)}>
              <EditIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Pantry;
