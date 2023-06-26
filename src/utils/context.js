import { useState, createContext } from 'react';
import React from 'react';
const ThemeContext = createContext();

const Context = React.memo(({ children }) => {
    var savedSidebar = localStorage.getItem('sidebar');
    console.log(savedSidebar)
    if (!savedSidebar) {
        savedSidebar = 1;
    }

    const [notify, setNotify] = useState(0);
    const [sidebar, setSidebar] = useState(savedSidebar);

    const handleSideBar = (id) => {
        localStorage.setItem('sidebar', id);
        setSidebar(id);
    };
    const toggleNotify = (quantity) => {
        setNotify(quantity);
    };

    const value = {
        notify,
        toggleNotify,
        sidebar,
        handleSideBar,
    };
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
});

export { Context, ThemeContext };
