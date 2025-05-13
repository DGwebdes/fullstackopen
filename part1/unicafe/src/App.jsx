import { useState } from "react";
function App() {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <>
            <div className="">
                <h1>Give Feedback</h1>
            </div>
            <div className="card">
                <Button
                    onFeedback={() => {
                        setGood((good) => good + 1);
                    }}
                    title={`good`}
                />
                <Button
                    onFeedback={() => setNeutral((neutral) => neutral + 1)}
                    title={`neutral`}
                />
                <Button
                    onFeedback={() => setBad((bad) => bad + 1)}
                    title={`bad`}
                />
            </div>
            <div className="">
                <h2>Statistics</h2>
                {good + neutral + bad == 0 ? (
                    <>
                        {" "}
                        <h2>No feedback given</h2>{" "}
                    </>
                ) : (
                    <table>
                        <Statistic text={`good`} value={good} />
                        <Statistic text={`neutral`} value={neutral} />
                        <Statistic text={`bad`} value={bad} />
                        <Statistic text={`all`} value={good + neutral + bad} />
                        <Statistic
                            text={`average`}
                            value={((good + neutral + bad) / 3).toFixed(1)}
                        />
                        <Statistic
                            text={`positive`}
                            value={`${(
                                (good / (good + neutral + bad)) *
                                100
                            ).toFixed(1)} %`}
                        />
                    </table>
                )}
            </div>
        </>
    );
}

const Statistic = ({ text, value }) => {
    return (
        <tr>
            <td className="">{text}</td>
            <td>{value}</td>
        </tr>
    );
};

const Button = ({ onFeedback, title }) => {
    return (
        <>
            <button onClick={onFeedback}>{title}</button>
        </>
    );
};

export default App;
