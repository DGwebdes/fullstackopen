import React from "react";

const Persons = ({ persons, handleDelete }) => {
    return (
        <div>
            <ul>
                {persons.map((person) => (
                    <li key={person.id}>
                        {person.name} - {person.number}
                        <button
                            onClick={() => {
                                if (window.confirm(`Delete ${person.name}?`)) {
                                    handleDelete(person.id);
                                }
                            }}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Persons;
