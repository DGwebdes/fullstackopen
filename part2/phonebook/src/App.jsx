import { useState, useEffect } from "react";

import "./App.css";
import PersonForm from "./components/PersonForm";
import FilterName from "./components/FilterName";
import Persons from "./components/Persons";
import utilsService from "./services/utils";

function App() {
    const [persons, setPersons] = useState([]);
    const [newPerson, setNewPerson] = useState({ name: "", number: "" });
    const [filter, setFilter] = useState("");
    const filteredList = persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase()),
    );
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        utilsService.getAll().then((person) => setPersons(person));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const personToAdd = {
            ...newPerson,
        };

        const personExists = persons.find(
            (person) =>
                person.name.toLowerCase() === personToAdd.name.toLowerCase(),
        );

        if (personExists) {
            const confirmUpdate = window.confirm(
                `${personExists.name} is already listed. Would you like to change its number?`,
            );

            if (confirmUpdate) {
                const personToUpdate = {
                    ...personExists,
                    number: personToAdd.number,
                };

                utilsService
                    .editUser(personExists.id, personToUpdate)
                    .then((returnedPerson) => {
                        setPersons((prev) =>
                            prev.map((p) =>
                                p.id === personExists.id ? returnedPerson : p,
                            ),
                        );
                        setNewPerson({ name: "", number: "" });
                        setSuccess("User successfully edited");
                        setTimeout(() => {
                            setSuccess(null);
                        }, 3000);
                    })
                    .catch((err) => {
                        setError(`Could not update user. Error: ${err}`);
                        if (err.status === 404) {
                            setError(
                                "The resource you are trying to edit no longer exists on our database.",
                            );
                        }
                    });
            }
            return;
        }

        if (
            personToAdd.name.trim() === "" ||
            personToAdd.number.trim() === ""
        ) {
            alert("Name and Number cannot be empty.");
            return;
        } else {
            utilsService
                .createUser(personToAdd)
                .then((response) => {
                    setPersons([...persons, response]);
                    setNewPerson({ name: "", number: "" });
                    setSuccess("User successfully created");
                    setTimeout(() => {
                        setSuccess(null);
                    }, 3000);
                })
                .catch((err) => {
                    setError(`Could not create new user. Error: ${err}`);
                });
        }
    };

    const handleDelete = (id) => {
        utilsService
            .deleteUser(id)
            .then((deleted) => {
                setPersons((prev) => prev.filter((p) => p.id !== deleted));
                setSuccess("User successfully deleted");
                setTimeout(() => {
                    setSuccess(null);
                }, 3000);
            })
            .catch((err) => {
                setError(`Failed to delete User. Error: ${err}`);
            });
    };

    return (
        <>
            {error && <h3 className="error">{error}</h3>}
            {success && <h3 className="success">{success}</h3>}
            <h2>Phonebook</h2>
            <FilterName filter={filter} setFilter={setFilter} />

            <PersonForm
                newPerson={newPerson}
                setNewPerson={setNewPerson}
                handleSubmit={handleSubmit}
            />
            <h2>Numbers</h2>
            <Persons persons={filteredList} handleDelete={handleDelete} />

            {/* DEBUGGING */}
            {/* <div className="">
                <h2>Debug</h2>
                <p>debug name: {newPerson.name}</p>
                <p>debug number: {newPerson.number}</p>
                <p>debug length: {persons.length}</p>
                <p>
                    debug persons: {persons.map((person) => person.name + "; ")}
                </p>
                <p>debug filter: {filter}</p>
            </div> */}
        </>
    );
}

export default App;
