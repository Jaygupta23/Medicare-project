import { useState, useContext, createContext } from 'react';

const PidContext = createContext();
const PidProvider = ({ children }) => {
    const [id, setId] = useState();
    const [upId, setUpId] = useState();

    return (
        <PidContext.Provider value={[id, setId, upId, setUpId]}>
            {children}
        </PidContext.Provider>
    );
};

// custom hook 

const usePid = () => useContext(PidContext);

export { usePid, PidProvider };
