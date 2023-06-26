import { useState, createContext } from 'react';
const ThemeContext = createContext();

function Context({ children }) {
    const [notify, setNotify] = useState(0);
    const toggleNotify = (quantity) => {
        setNotify(quantity);
    };

    const value = {
        notify,
        toggleNotify,
    };
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export { Context, ThemeContext };
