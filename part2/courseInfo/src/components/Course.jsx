const Course = ({ course }) => {
    console.log(course);
    return course.map((course) => (
        <div key={course.id}>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    ));
};

const Header = ({ course }) => {
    return <h1>Course: {course.name}</h1>;
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
    return (
        <p>
            Total of{" "}
            {parts.reduce((f, s) => {
                return f + s.exercises;
            }, 0)}{" "}
            Exercises
        </p>
    );
};

export default Course;
