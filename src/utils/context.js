import { useState, createContext } from 'react';
import React from 'react';
const ThemeContext = createContext();

const Context = ({ children }) => {
    var savedSidebar = localStorage.getItem('sidebar');
    if (!savedSidebar) {
        savedSidebar = 1;
    }

    const [sidebar, setSidebar] = useState(savedSidebar);

    const handleSideBar = (id) => {
        localStorage.setItem('sidebar', id);
        setSidebar(id);
    };

    var value = {
        sidebar,
        handleSideBar,
    };
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export { Context, ThemeContext };
