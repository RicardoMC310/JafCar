import { useState, useEffect } from 'react';

export default function useStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            const stored = localStorage.getItem(key);
            return stored !== null ? JSON.parse(stored) : initialValue;
        } catch (err) {
            console.warn('Erro ao ler localStorage:', err);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (err) {
            console.warn('Erro ao salvar no localStorage:', err);
        }
    }, [key, value]);

    return [value, setValue];
}
