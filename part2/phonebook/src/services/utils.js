import axios from "axios";
const localURL = "http://localhost:3001/persons/";

function getAll() {
    let data = axios.get(localURL).then((response) => response.data);
    return data;
}

function createUser(body) {
    let adding = axios.post(localURL, body);
    return adding.then((response) => response.data);
}

function editUser(id, body) {
    let editing = axios.put(`${localURL}${id}`, body);
    return editing.then((response) => response.data);
}

function deleteUser(id) {
    return axios.delete(localURL + id).then(() => id);
}

export default { getAll, editUser, deleteUser, createUser };
