import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

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

GenresProvider.propTypes = {
    children: PropTypes.node.isRequired
};
