function App() {
    const course = {
        name: "Half Stack application development",

        parts: [
            {
                name: "Fundamentals of React",
                exercises: 10,
            },
            {
                name: "Using props to pass data",
                exercises: 7,
            },
            {
                name: "State of components",
                exercises: 14,
            },
        ],
    };

    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    );
}

const Header = ({ course }) => {
    return <h1>Course: {course}</h1>;
};
const Content = ({ parts }) => {
    return (
        <>
            <Part part={parts} />
        </>
    );
};

const Part = ({ part }) => {
    return part.map((part) => (
        <p key={part.name}>
            {part.name} {part.exercises}
        </p>
    ));
};

const Total = ({ parts }) => {
    const [first, second, third] = parts;
    return (
        <p>
            Number of exercises{" "}
            {first.exercises + second.exercises + third.exercises}{" "}
        </p>
    );
};
export default App;
