const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = 3002;

app.use(express.json());
app.use(morgan("tiny"));
app.use(
    morgan(function (token, req, res) {
        const data = req.body;
        return JSON.stringify(data);
    }),
);

let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "999888999",
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: "3",
        name: "steven",
        number: "999888777",
    },
];

app.get("/api/persons", (req, res) => {
    res.json(persons);
});

app.get("/info", (req, res) => {
    const n = persons.length;
    const t = new Date().toString();

    res.write(`The Phonebook has info of ${n} people\n${t}`);
    res.send();
});

app.get("/api/persons/:id", (req, res) => {
    const p = persons.filter((target) => req.params.id === target.id);

    if (p.length === 0) {
        res.status(404).send("Not found");
        return;
    }

    res.json(p);
    // console.log(p);
});

app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    const r = persons.filter((t) => t.id !== id);
    if (r.length === persons.length) {
        console.log("Error Deleting entry.");
        res.status(400).send("Error Deleting Person");
        return;
    }
    res.json(r);
});

app.post("/api/persons", (req, res) => {
    const data = req.body;

    if (!data.name || !data.number) {
        res.status(400).send("Missing name or number");
        return;
    }

    const person = {
        id: randomIDGenerator(),
        name: data.name,
        number: data.number,
    };
    // console.log(person);

    persons.concat(person);
    res.json(person);
});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});

function randomIDGenerator() {
    return Math.random() * 432;
}
