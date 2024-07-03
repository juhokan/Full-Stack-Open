import React from 'react'

interface CourseData {
  readonly name: string
  readonly exerciseCount: number
}

interface ContentProps {
  readonly courses: CourseData[]
}

const Content: React.FC<ContentProps> = ({ courses }) => {
  return (
    <>
     <p>
        {courses[0].name} {courses[0].exerciseCount}
      </p>
      <p>
        {courses[1].name} {courses[1].exerciseCount}
      </p>
      <p>
        {courses[2].name} {courses[2].exerciseCount}
      </p>
    </>
  )
}

export default Content