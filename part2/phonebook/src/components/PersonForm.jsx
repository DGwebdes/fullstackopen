import React from "react";

const PersonForm = ({ newPerson, setNewPerson, handleSubmit }) => {
    return (
        <form>
            <div>
                name:{" "}
                <input
                    value={newPerson.name}
                    onChange={(e) =>
                        setNewPerson({ ...newPerson, name: e.target.value })
                    }
                />
            </div>
            <div>
                number:{" "}
                <input
                    type="text"
                    value={newPerson.number}
                    onChange={(e) =>
                        setNewPerson({
                            ...newPerson,
                            number: e.target.value,
                        })
                    }
                />
            </div>
            <div>
                <button type="submit" onClick={handleSubmit}>
                    add
                </button>
            </div>
        </form>
    );
};

export default PersonForm;
