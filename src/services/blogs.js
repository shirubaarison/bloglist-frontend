import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
	token = `Bearer ${newToken}`
}

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const createBlog = async newObj => {
	const config = {
		headers: { Authorization: token },
	}

	const response = await axios.post(baseUrl, newObj, config)
	console.log(response)
	return response.data
}

const addLike = async (id, changedObj) => {
	const config = {
		headers: { Authorization: token },
	}

	const response = await axios.put(`${baseUrl}/${id}`, changedObj, config)
	return response.data
}

const removeBlog = async (id) => {
	const config = {
		headers: { Authorization: token },
	}

	const response = await axios.delete(`${baseUrl}/${id}`, config)
	return response.data
}

export default { getAll, setToken, createBlog, addLike, removeBlog }