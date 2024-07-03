import React from 'react';
import { CoursePart } from '../model';
import Part from './Part';

interface ContentProps {
  readonly courses: CoursePart[];
}

const Content: React.FC<ContentProps> = ({ courses }) => {
  return (
    <>
      {courses && courses.map((c, i) => (
        <Part key={i} part={c} />
      ))}
    </>
  );
}

export default Content;
