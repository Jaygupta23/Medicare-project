import { useState, useContext, createContext } from 'react';

const SearchContext = createContext();
const SearchProvider = ({ children }) => {
    const [values, setValues] = useState({
        keywords: "",
        results: [],
    });
    const [id, setId] = useState();
    return (
        <SearchContext.Provider value={[values, setValues]}>
            {children}
        </SearchContext.Provider>
    );
};

// custom hook 

const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
