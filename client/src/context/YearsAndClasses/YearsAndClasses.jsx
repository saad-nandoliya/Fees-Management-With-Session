import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const URL = import.meta.env.VITE_URL;

// Context banate hain
const SessionClassContext = createContext();

// Custom hook for easy access
export const useSessionClass = () => useContext(SessionClassContext);

// Provider component
export const SessionClassProvider = ({ children }) => {
    const [sessionYear, setSessionYear] = useState([]);
    const [classes, setClasses] = useState([]);
    const [sectionList, setSectionList] = useState([]);

    const fetchSessionClass = async () => {
        try {
            const sessionRes = await axios.get(`${URL}/get-session-year`);
            const classRes = await axios.get(`${URL}/get-class`);
            const sectionRes = await axios.get(`${URL}/get-section`);
            setSessionYear(sessionRes.data);
            setClasses(classRes.data);
            setSectionList(sectionRes.data);
        } catch (error) {
            console.error("Failed to fetch session/classes:", error);
        }
    };

    useEffect(() => {
        fetchSessionClass();
    }, []);

    return (
        <SessionClassContext.Provider value={{ sessionYear, classes, sectionList }}>
            {children}
        </SessionClassContext.Provider>
    );
};
