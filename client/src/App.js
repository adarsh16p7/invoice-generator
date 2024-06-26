import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    // Initialize state to hold invoice data
    const [data, setData] = useState({
        logo: 'https://your-logo-url.com/logo.png', // URL for company logo
        seller: { name: '', address: '', city: '', state: '', pincode: '', pan: '', gst: '' }, // Seller details
        billing: { name: '', address: '', city: '', state: '', pincode: '', stateCode: '' }, // Billing details
        shipping: { name: '', address: '', city: '', state: '', pincode: '', stateCode: '' }, // Shipping details
        placeOfSupply: '', // Place of supply
        placeOfDelivery: '', // Place of delivery
        orderNumber: '', // Order number
        orderDate: '', // Order date
        invoiceNumber: '', // Invoice number
        invoiceDate: '', // Invoice date
        dueDate: '', // Due date
        reverseCharge: 'No', // Reverse charge indicator
        items: [{ description: '', unitPrice: 0, quantity: 1, discount: 0, netAmount: 0 }], // List of items in the invoice
        totalAmount: 0, // Total amount of the invoice
        signature: 'https://your-signature-url.com/signature.png' // URL for authorized signature image
    });

    // Handle change in input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        const keys = name.split('.');
        if (keys.length === 2) {
            setData(prevData => ({
                ...prevData,
                [keys[0]]: {
                    ...prevData[keys[0]],
                    [keys[1]]: value
                }
            }));
        } else {
            setData(prevData => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    // Handle change in item input fields
    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const items = [...data.items];
        items[index][name] = value;
        items[index].netAmount = (items[index].unitPrice * items[index].quantity) - items[index].discount;
        setData(prevData => ({ ...prevData, items }));
    };

    // Add a new item to the invoice
    const addItem = () => {
        setData(prevData => ({
            ...prevData,
            items: [...prevData.items, { description: '', unitPrice: 0, quantity: 1, discount: 0, netAmount: 0 }]
        }));
    };

    // Handle form submission to generate invoice PDF
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/generate-invoice', data, { responseType: 'blob' })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'invoice.pdf');
                document.body.appendChild(link);
                link.click();
            })
            .catch(error => {
                console.error('There was an error generating the invoice!', error);
            });
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <h2>Seller Details</h2>
                <div>
                    <label>Seller Name:</label>
                    <input type="text" name="seller.name" value={data.seller.name} onChange={handleChange} />
                </div>
                <div>
                    <label>Seller Address:</label>
                    <input type="text" name="seller.address" value={data.seller.address} onChange={handleChange} />
                    <input type="text" name="seller.city" placeholder="City" value={data.seller.city} onChange={handleChange} />
                    <input type="text" name="seller.state" placeholder="State" value={data.seller.state} onChange={handleChange} />
                    <input type="text" name="seller.pincode" placeholder="Pincode" value={data.seller.pincode} onChange={handleChange} />
                </div>
                <div>
                    <label>Seller PAN:</label>
                    <input type="text" name="seller.pan" value={data.seller.pan} onChange={handleChange} />
                </div>
                <div>
                    <label>Seller GST:</label>
                    <input type="text" name="seller.gst" value={data.seller.gst} onChange={handleChange} />
                </div>

                <h2>Billing Details</h2>
                <div>
                    <label>Billing Name:</label>
                    <input type="text" name="billing.name" value={data.billing.name} onChange={handleChange} />
                </div>
                <div>
                    <label>Billing Address:</label>
                    <input type="text" name="billing.address" value={data.billing.address} onChange={handleChange} />
                    <input type="text" name="billing.city" placeholder="City" value={data.billing.city} onChange={handleChange} />
                    <input type="text" name="billing.state" placeholder="State" value={data.billing.state} onChange={handleChange} />
                    <input type="text" name="billing.pincode" placeholder="Pincode" value={data.billing.pincode} onChange={handleChange} />
                </div>
                <div>
                    <label>Billing State Code:</label>
                    <input type="text" name="billing.stateCode" value={data.billing.stateCode} onChange={handleChange} />
                </div>

                <h2>Shipping Details</h2>
                <div>
                    <label>Shipping Name:</label>
                    <input type="text" name="shipping.name" value={data.shipping.name} onChange={handleChange} />
                </div>
                <div>
                    <label>Shipping Address:</label>
                    <input type="text" name="shipping.address" value={data.shipping.address} onChange={handleChange} />
                    <input type="text" name="shipping.city" placeholder="City" value={data.shipping.city} onChange={handleChange} />
                    <input type="text" name="shipping.state" placeholder="State" value={data.shipping.state} onChange={handleChange} />
                    <input type="text" name="shipping.pincode" placeholder="Pincode" value={data.shipping.pincode} onChange={handleChange} />
                </div>
                <div>
                    <label>Shipping State Code:</label>
                    <input type="text" name="shipping.stateCode" value={data.shipping.stateCode} onChange={handleChange} />
                </div>

                <div>
                    <label>Place of Supply:</label>
                    <input type="text" name="placeOfSupply" value={data.placeOfSupply} onChange={handleChange} />
                </div>
                <div>
                    <label>Place of Delivery:</label>
                    <input type="text" name="placeOfDelivery" value={data.placeOfDelivery} onChange={handleChange} />
                </div>
                <div>
                    <label>Order Number:</label>
                    <input type="text" name="orderNumber" value={data.orderNumber} onChange={handleChange} />
                </div>
                <div>
                    <label>Order Date:</label>
                    <input type="date" name="orderDate" value={data.orderDate} onChange={handleChange} />
                </div>
                <div>
                    <label>Invoice Number:</label>
                    <input type="text" name="invoiceNumber" value={data.invoiceNumber} onChange={handleChange} />
                </div>
                <div>
                    <label>Invoice Date:</label>
                    <input type="date" name="invoiceDate" value={data.invoiceDate} onChange={handleChange} />
                </div>
                <div>
                    <label>Due Date:</label>
                    <input type="date" name="dueDate" value={data.dueDate} onChange={handleChange} />
                </div>
                <div>
                    <label>Reverse Charge:</label>
                    <select name="reverseCharge" value={data.reverseCharge} onChange={handleChange}>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>

                <h2>Items</h2>
                {data.items.map((item, index) => (
                    <div key={index}>
                      <label>Description:</label>
                      <input type="text" name="description" value={item.description} onChange={e => handleItemChange(index, e)} />
                      <label>Unit Price:</label>
                      <input type="number" name="unitPrice" value={item.unitPrice} onChange={e => handleItemChange(index, e)} />
                      <label>Quantity:</label>
                      <input type="number" name="quantity" value={item.quantity} onChange={e => handleItemChange(index, e)} />
                      <label>Discount:</label>
                      <input type="number" name="discount" value={item.discount} onChange={e => handleItemChange(index, e)} />
                    </div>
                ))}
                <button type="button" onClick={addItem}>Add Item</button>

                <div>
                    <label>Total Amount:</label>
                    <input type="number" name="totalAmount" value={data.totalAmount} readOnly />
                </div>
                <button type="submit">Generate Invoice</button>
            </form>
        </div>
    );
}

export default App;
