'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}


const getLocalStorage = () => JSON.parse(localStorage.getItem('db_volunteer')) ?? []
const setLocalStorage = (dbVolunteer) => localStorage.setItem("db_volunteer", JSON.stringify(dbVolunteer))

// CRUD - create read update delete
const deleteVolunteer = (index) => {
    const dbVolunteer = readVolunteer()
    dbVolunteer.splice(index, 1)
    setLocalStorage(dbVolunteer)
}

const updateVolunteer = (index, Volunteer) => {
    const dbVolunteer = readVolunteer()
    dbVolunteer[index] = volunteer
    setLocalStorage(dbVolunteer)
}

const readVolunteer = () => getLocalStorage()

const createVolunteer = (volunteer) => {
    const dbVolunteer = getLocalStorage()
    dbVolunteer.push (volunteer)
    setLocalStorage(dbVolunteer)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

//Interação com o layout

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
    document.getElementById('nome').dataset.index = 'new'
    document.querySelector(".modal-header>h2").textContent  = 'Novo Voluntário'
}

const saveVolunteer = () => {
    if (isValidFields()) {
        const volunteer = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value
        }
        const index = document.getElementById('nome').dataset.index
        if (index == 'new') {
            createVolunteer(volunteer)
            updateTable()
            closeModal()
        } else {
            updateVolunteer(index, volunteer)
            updateTable()
            closeModal()
        }
    }
}

const createRow = (volunteer, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${volunteer.nome}</td>
        <td>${volunteer.email}</td>
        <td>${volunteer.celular}</td>
        <td>${volunteer.cidade}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}" >Excluir</button>
        </td>
    `
    document.querySelector('#tableVolunteer>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableVolunteer>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbVolunteer = readVolunteer()
    clearTable()
    dbVolunteer.forEach(createRow)
}

const fillFields = (volunteer) => {
    document.getElementById('nome').value = volunteer.nome
    document.getElementById('email').value = volunteer.email
    document.getElementById('celular').value = volunteer.celular
    document.getElementById('cidade').value = volunteer.cidade
    document.getElementById('nome').dataset.index = volunteer.index
}

const editVolunteer = (index) => {
    const volunteer = readVolunteer()[index]
    volunteer.index = index
    fillFields(volunteer)
    document.querySelector(".modal-header>h2").textContent  = `Editando ${volunteer.nome}`
    openModal()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editVolunteer(index)
        } else {
            const volunteer = readVolunteer()[index]
            const response = confirm(`Deseja realmente excluir o voluntário ${volunteer.nome}`)
            if (response) {
                deleteVolunteer(index)
                updateTable()
            }
        }
    }
}

updateTable()

// Eventos
document.getElementById('cadastrarVoluntario')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveVolunteer)

document.querySelector('#tableVolunteer>tbody')
    .addEventListener('click', editDelete)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)