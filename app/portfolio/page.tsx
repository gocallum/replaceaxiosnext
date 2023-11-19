'use client';
import React, { useState } from 'react';
import axios from 'axios';

type Portfolio = {
    id: string;
    name: string;
    description: string;
};

// Function using Axios to get portfolio data
const getPortfolioDataWithAxios = async (id: string): Promise<Portfolio | undefined> => {
    try {
        const response = await axios.get<Portfolio>(`/api/portfolio?id=${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data with Axios:', error);
        return undefined;
    }
};

// Function using Next.js fetch method to get portfolio data
const getPortfolioDataWithFetch = async (id: string): Promise<Portfolio | undefined> => {
    try {
        const response = await fetch(`/api/portfolio?id=${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching data with fetch:', error);
        return undefined;
    }
};

const PortfolioPage = () => {
    const [portfolio, setPortfolio] = useState<Portfolio | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [portfolioId, setPortfolioId] = useState<string>('');

    const handleSearch = async () => {
        setLoading(true);
        const data = await getPortfolioDataWithFetch(portfolioId);
        setPortfolio(data);
        setLoading(false);
    };

    return (
        <div style={{ backgroundColor: 'white', padding: '20px' }}>
            <h1>Portfolio Data</h1>
            <input 
                type="text" 
                value={portfolioId} 
                onChange={(e) => setPortfolioId(e.target.value)} 
                placeholder="Enter Portfolio ID"
            />
            <button onClick={handleSearch}>Search</button>
            {loading ? (
                <p>Loading...</p>
            ) : portfolio ? (
                <div>
                    <p>ID: {portfolio.id}</p>
                    <p>Name: {portfolio.name}</p>
                    <p>Description: {portfolio.description}</p>
                </div>
            ) : (
                <p>No data found</p>
            )}
        </div>
    );
};

export default PortfolioPage;
