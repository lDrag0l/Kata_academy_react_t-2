import React, { createContext, useContext, useState } from 'react';

const GenresContext = createContext();

export const GenresProvider = ({ children }) => {
    const [genres, setGenres] = useState([]);

    return (
        <GenresContext.Provider value={{ genres, setGenres }}>
            {children}
        </GenresContext.Provider>
    );
};

export const useGenres = () => useContext(GenresContext);
