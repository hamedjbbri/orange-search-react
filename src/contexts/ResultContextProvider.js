import React, { createContext, useContext, useState } from 'react';

   
const ResultContext = createContext();
const baseURL = 'https://google-search3.p.rapidapi.com/api/v1';

export const ResultContextProvider = ({ children }) => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');


     const getResults = async (type) => {
        setIsLoading(true);

        const response = await fetch(`${baseURL}${type}`, {
            methos: 'GET',
            headers: {
                'x-user-agent': 'desktop',
    'x-rapidapi-host': 'google-search3.p.rapidapi.com',
    'x-rapidapi-key': 'f5731df97amshc44b6d20924f92bp170baajsn6d0a7971ea78'
            }
        });

        const data = await response.json();
        
        console.log(data);


        setResults(data);
        setIsLoading(false); 
    } 

    return (
        <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}>
            {children}
        </ResultContext.Provider>
    )
}

export const useResultContext = () => useContext(ResultContext);