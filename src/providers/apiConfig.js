const apiConfig = {
    apiUrl: import.meta.env.VITE_REACT_API_URL,
    getHeaders: () => ({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
    })
}

export default apiConfig;