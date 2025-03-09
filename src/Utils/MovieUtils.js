import { useState, useEffect } from 'react';

export function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    }

    let truncated = text.substring(0, maxLength);

    const lastSpaceIndex = truncated.lastIndexOf(' ');

    if (lastSpaceIndex !== -1) {
        truncated = truncated.substring(0, lastSpaceIndex) + '...';
    } else {
        truncated += '...';
    }

    return truncated;
}


function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;
