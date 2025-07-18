import React from "react";

const FilterName = ({ filter, setFilter }) => {
    return (
        <div>
            filter:{" "}
            <input value={filter} onChange={(e) => setFilter(e.target.value)} />
        </div>
    );
};

export default FilterName;
