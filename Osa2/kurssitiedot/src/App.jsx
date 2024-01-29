
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
      <h1>{course.name}</h1>
      <ul>
        {course.parts.map(part => (
          <Part key={part.id} part={part} />
        ))}
        <b>Total exercises: {total}</b>
      </ul>
    </div>
  );
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
      
    ]
  }



  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App