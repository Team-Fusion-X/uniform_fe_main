import React, { createContext, useState, useContext } from 'react';

const AverageContext = createContext();

export const useAverage = () => useContext(AverageContext);

export const AverageProvider = ({ children }) => {
    const [mainAverage, setMainAverage] = useState('0.0');
    const [kemrAverage, setKemrAverage] = useState('0.0');

    return (
        <AverageContext.Provider value={{ mainAverage, setMainAverage, kemrAverage, setKemrAverage }}>
            {children}
        </AverageContext.Provider>
    );
};
