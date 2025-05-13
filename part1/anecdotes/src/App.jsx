import { useState } from "react";

const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
];

function App() {
    const [selected, setSelected] = useState(null);
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
    console.log(votes);
    const most = votes.indexOf(Math.max(...votes));
    console.log(most);

    const randAnec = () => {
        const n = Math.floor(Math.random() * anecdotes.length);
        setSelected(n);
    };

    const addVote = (selected) => {
        const newVote = [...votes];
        newVote[selected] += 1;
        setVotes(newVote);
    };

    return (
        <div className="">
            <h1>Anecdote of the Day</h1>
            {selected === null ? (
                <h2>Click to see it</h2>
            ) : (
                <>
                    <p>{anecdotes[selected]}</p>
                    <p>Votes: {votes[selected]}</p>
                </>
            )}
            <div>
                <button onClick={randAnec}>Random Anecdotes</button>
                {selected != null && (
                    <button onClick={() => addVote(selected)}>Vote</button>
                )}
            </div>
            <div className="">
                <h2>Anecdote with Most Votes</h2>
                <p>{anecdotes[most]}</p>
            </div>
        </div>
    );
}

export default App;
