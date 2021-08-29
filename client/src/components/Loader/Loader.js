import React, { useEffect, useState } from 'react';
import './Loader.css';

export default function Loader() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 3000);
    }, []);

    return (
        loading
            ? <div className="loader">
                <span></span>
              </div>
            : null
    )
}
