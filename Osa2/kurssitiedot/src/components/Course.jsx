
const Part = ({ part }) => {
    return (
      <p>
        {part.name} {part. exercises}
      </p>
    );
  }

const Course = ({ course }) => {
    let sum = 0
    const total = course.parts.reduce((accumulator, part) => accumulator + part.exercises, sum);
  
    return (
      <div>
        <h3>{course.name}</h3>
          {course.parts.map(part => (
            <Part key={part.id} part={part} />
          ))}
          <b>Total of {total} exercises</b>
      </div>
    );
  }

export default Course