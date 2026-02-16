import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000/api/entries/'

export const saveEntry = async (entryData) => {
    try {
        const response = await axios.post('http://localhost:8000/api/entries/', entryData)
        return response.data
    } catch (error) {
        console.error('Error saving entry: ', error)
        throw error
    }
}