import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listItems, saveItem, deleteItem } from '../actions/itemActions';

export function ItemsPage (props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [ID, setID] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');

    const itemSave = useSelector(state => state.itemSave);
    const { loading: loadingSave, success: successSave, error: errorSave } = itemSave;

    const itemDelete = useSelector(state => state.itemDelete);
    const { success: successDelete } = itemDelete;

    const itemList = useSelector(state => state.itemList)
    const { items } = itemList;
    const dispatch = useDispatch();

    useEffect(() => {
        if (successSave) {
            setModalVisible(false);
        }
        dispatch(listItems());
        return () => {

        };
    }, [dispatch, successSave, successDelete]);

    const openModal = (item) => {
        setModalVisible(true);
        setID(item._id);
        setName(item.name);
        setPrice(item.price);
        setImage(item.image);
        setCategory(item.category);
        setDescription(item.description);
        setStock(item.stock);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(saveItem({ _id: ID, name, price, image, category, stock, description }));
    };

    const handleDelete = (item) => {
        dispatch(deleteItem(item._id));
    };

    return (
        <div className='items-content'>
            <div className='item-header'>
                <h3>Items</h3>
                <button className='secondary-button' onClick={() => openModal({})}>Create Item</button> 
            </div>
            {modalVisible && 
            <div className="form">
                
                <form onSubmit={handleSubmit}>
                    <ul className='form-container'>
                        <li>
                            <h3>Add New Item</h3>
                        </li>
                        <li>
                            {loadingSave && <div className="loading"><img src='../images/loading.gif' alt="loading"></img></div>}
                            {errorSave && {errorSave}}
                        </li>
                        <li>
                            <label htmlFor='name'>Name</label>
                            <input type='name' name='text' id='name' value={name} onChange={(event) => setName(event.target.value)}></input>
                        </li>
                        <li>
                            <label htmlFor='price'>Price</label>
                            <input type='text' name='price' id='price' value={price} onChange={(event) => setPrice(event.target.value)}></input>
                        </li>
                        <li>
                            <label htmlFor='image'>Image</label>
                            <input type='text' name='image' id='image' value={image} onChange={(event) => setImage(event.target.value)}></input>
                        </li>
                        <li>
                            <label htmlFor='category'>Category</label>
                            <input type='text' name='category' id='category' value={category} onChange={(event) => setCategory(event.target.value)}></input>
                        </li>
                        <li>
                            <label htmlFor='stock'>Stock</label>
                            <input type='text' name='stock' id='stock' value={stock} onChange={(event) => setStock(event.target.value)}></input>
                        </li>
                        <li>
                            <label htmlFor='description'>Description</label>
                            <textarea type='text' name='description' id='description' value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
                        </li>
                        <li>
                            <button type='submit' className='primary-button'>{ID ? 'Update' : 'Add item'}</button>
                            <button className='secondary-button' onClick={() => setModalVisible(false)}>Close Form</button>
                        </li>
                        
                    </ul>
                </form>
                </div>
                }

                <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Category</th>
                        <th>Stock</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr>
                            <td>{item._id}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.image}</td>
                            <td>{item.category}</td>
                            <td>{item.stock}</td>
                            <td>{item.description}</td>
                            <td>
                                <button onClick={() => openModal(item)}>Edit</button>
                                <button onClick={() => handleDelete(item)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        
        </div>
        )
}