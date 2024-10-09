"use client"; // Ensure this is at the top of your file

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios'; // Import Axios
import { useRouter } from 'next/navigation'; // Ensure you're using the correct import

export default function Add() {
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [currentDate, setCurrentDate] = useState('');
    const [quantity, setQuantity] = useState(1); // State to hold selected quantity
    const [medicineName, setMedicineName] = useState(''); // State to hold medicine name
    const router = useRouter(); // Initialize the router

    // Set the current date in YYYY-MM-DD format on component mount
    useEffect(() => {
        const date = new Date();
        const formattedDate = date.toISOString().split('T')[0]; // Format to YYYY-MM-DD
        setCurrentDate(formattedDate);
    }, []);

    const handleAddToCart = async () => {
        const medicineData = {
            name: medicineName,
            stockStill: new Date(),
            dose: quantity,
            time: quantity === 2 ? "Morning" : "",
            imageUrl: ""
        };

        try {
            debugger
            const response = await axios.post(`https://medicineserver.onrender.com/api/medicines`, medicineData);
            setNotification({ message: response.data.message, type: response.data.type });
            if (response.data.type === "success") {
                setTimeout(() => {
                    router.push('/'); // Navigate to home page
                }, 3000);
            }


        } catch (error) {
            // Catch any error from the fetch and set notification
            setNotification({ message: error.message || 'Failed to add item to cart.', type: response.data.type });
            console.error('Error adding item to cart:', error);
        }

        // Clear notification after 3 seconds if there is no error
        setTimeout(() => setNotification({ message: '', type: '' }), 3000);
    };

    return (
        <div className="flex items-start justify-center min-h-screen bg-gray-100 px-2 sm:px-4 pt-10">
            {notification.message && (
                <div className={`p-3 rounded-lg shadow-md fixed top-2 z-10 transition-all duration-300 ease-in-out transform ${notification.type === 'success' ? 'bg-green-500 scale-105' : 'bg-red-500 scale-105'} text-white`}>
                    {notification.message}
                </div>
            )}

            <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden shadow-xl transition-shadow duration-300 ease-in-out max-w-sm w-full">
                <div className="w-full h-40 relative bg-gray-100 flex justify-center items-center">
                    <Image
                        className="object-contain hover:opacity-80 transition-opacity duration-200"
                        src={`/images/newmedicine.jpg`}
                        alt={"new medicine"}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                </div>

                <div className="p-4 text-center">
                    <h5 className="text-xl font-bold mb-3 text-gray-900 hover:text-indigo-600 transition-colors duration-200">
                        <input
                            type="text"
                            className="border rounded-lg px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter New Medicine Name"
                            value={medicineName} // Bind value to medicineName state
                            onChange={(e) => setMedicineName(e.target.value)} // Update state on change
                        />
                    </h5>

                    <p className="text-gray-600 mb-4 text-sm">
                        <input
                            type="date"  // Changed to date type
                            className="border rounded-lg px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            value={currentDate} // Set the value to the current date
                            onChange={(e) => setCurrentDate(e.target.value)} // Update state on change
                        />
                    </p>

                    {/* Label and Radio Buttons for Quantity in a single line */}
                    <div className="flex items-center mb-4 text-gray-700 w-full">
                        <span className="mr-2">Tablets per day:</span>
                        <div className="flex items-center space-x-2 ml-1">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="quantity"
                                    value={1}
                                    checked={quantity === 1}
                                    onChange={() => setQuantity(1)} // Update quantity to 1
                                    className="mr-1"
                                />
                                1
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="quantity"
                                    value={2}
                                    checked={quantity === 2}
                                    onChange={() => setQuantity(2)} // Update quantity to 2
                                    className="mr-1"
                                />
                                2
                            </label>
                        </div>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="bg-indigo-500 text-white py-1.5 px-4 rounded-full hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition-transform transform hover:scale-105">
                        Add to List
                    </button>
                </div>
            </div>
        </div>
    );
}
