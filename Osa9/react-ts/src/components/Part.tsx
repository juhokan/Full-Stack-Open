import React from 'react';
import { CoursePart } from '../model';

interface PartProps {
  readonly part: CoursePart;
}

const Part: React.FC<PartProps> = ({ part }) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p>{part.description}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p>Group projects: {part.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p>{part.description}</p>
          <p>Background material: <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a></p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

function assertNever(value: never): never {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
}

export default Part;