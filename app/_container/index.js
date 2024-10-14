"use client"; // This makes the component a client component

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

export default function MedicineList() {
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantities, setQuantities] = useState({});
    const [notification, setNotification] = useState({ message: '', type: '' }); // State for notifications


    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const response = await axios.get('https://medicineserver.onrender.com/api/medicines');
                setMedicines(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMedicines();
    }, []);

    // Function to format date to "DD-MMM-YYYY"
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options).replace(/\s/g, '-');
    };

    // Handle quantity input change
    const handleQuantityChange = (id, value) => {
        setQuantities((prev) => ({ ...prev, [id]: value }));
    };

    // Handle Add button click to send data to API
    const handleAddToCart = async (medicine) => {
        const quantity = quantities[medicine._id];

        if (!quantity || quantity < 1) {
            setNotification({ message: "Please enter a valid quantity.", type: 'error' });
            setTimeout(() => setNotification({ message: '', type: '' }), 3000);
            return;
        }

        // Adjust the quantity based on the dose
        let adjustedQuantity = quantity;
        let updatedTime = medicine.time;

        if (medicine.dose === 2) {
            // Calculate adjusted quantity and update time based on whether quantity is even or odd
            const isEven = quantity % 2 === 0;

            adjustedQuantity = isEven ? quantity / 2 : Math.floor(quantity / 2); // Halve the quantity

            if (!isEven) {
                updatedTime = updatedTime === "Morning" ? "Evening" : "Morning"; // Toggle time
                adjustedQuantity += updatedTime === "Evening" ? 0 : 1; // Add 1 if updated time is Evening
            }
        }



        // Calculate the delivery date based on the adjusted quantity
        const stockStillDate = new Date(medicine.stockStill);
        const deliveryDate = new Date(stockStillDate.setDate(stockStillDate.getDate() + parseInt(adjustedQuantity)));
        const data = {
            _id: medicine._id,                  // Keep medicine ID
            name: medicine.name,                // Use the medicine name as title
            imageUrl: medicine.imageUrl,        // Image URL
            time: updatedTime,
            stockStill: deliveryDate,           // Set the stock still date
        };

        try {
            const response = await axios.put(`https://medicineserver.onrender.com/api/medicines/${medicine._id}`, data);

            // Update the medicine in the state immediately
            setMedicines((prevMedicines) =>
                prevMedicines.map((med) =>
                    med._id === medicine._id ? { ...med, stockStill: deliveryDate, time: updatedTime } : med
                )
            );

            // Clear the input quantity
            setQuantities((prev) => ({ ...prev, [medicine._id]: '' }));

            setNotification({ message: `Updated successfully!`, type: 'success' });
            setTimeout(() => setNotification({ message: '', type: '' }), 3000); // Hide message after 3 seconds
        } catch (err) {
            console.error("Error updating cart item:", err);
            if (err.response) {
                console.error("Response data:", err.response.data);
                console.error("Response status:", err.response.status);
            }
            setNotification({ message: "Failed to update cart item. Please try again.", type: 'error' });
            setTimeout(() => setNotification({ message: '', type: '' }), 3000); // Hide message after 3 seconds
        }
    };


    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (error) return <p className="text-center text-red-500 mt-10">Error fetching medicines: {error}</p>;

    return (
        <div className="container mx-auto px-4 mt-8">
            {notification.message && (
                <div className={`p-4 rounded-lg shadow-md sticky top-0 z-10 transition-all duration-300 ease-in-out transform ${notification.type === 'success' ? 'bg-green-500 scale-105' : 'bg-red-500 scale-105'} text-white`}>
                    {notification.message}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
                {medicines.map((medicine) => (
                    <div
                        key={medicine._id}
                        className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">

                        <div className="w-full h-60 relative">
                            <Image
                                className="object-contain w-full h-full hover:opacity-80 transition-opacity duration-200"
                                src={medicine.imageUrl === "" ? "/images/coming.jpg" : `/images/${medicine.imageUrl}`}
                                alt={medicine.name}
                                layout="fill"
                            />
                        </div>


                        <div className="p-6 text-center">
                            <h5 className="text-2xl font-bold mb-3 text-gray-900 hover:text-indigo-600 transition-colors duration-200">
                                {medicine.name}
                            </h5>

                            <p className="text-gray-600 mb-4 text-sm">
                                Stock Till: <span className="font-semibold text-gray-800">{formatDate(medicine.stockStill)}</span> <b>{medicine.time}</b>
                            </p>

                            <div className="flex justify-center items-center space-x-4 mb-6">
                                <input
                                    type="number"
                                    min="1"
                                    placeholder="Qty"
                                    value={quantities[medicine._id] || ""}
                                    onChange={(e) => handleQuantityChange(medicine._id, e.target.value)}
                                    className="w-24 py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
                                />
                            </div>

                            <button
                                onClick={() => handleAddToCart(medicine)}
                                className="bg-indigo-500 text-white py-2 px-5 rounded-full hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition-transform transform hover:scale-105">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
}
