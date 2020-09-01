import React from 'react';
import { Project } from '../types';
import ProjectListItem from './ProjectListItem';

type Props = {
  projects: Project[]
}
const ProjectList = ({ projects }: Props): JSX.Element => (
  <>
    <p>{projects.length ? 'Current projects' : 'No Project: Eager to work'}</p>
    <ul>
      {
      projects.map((item) => <ProjectListItem key={item.id} project={item} />)
    }
    </ul>
  </>
);

export default ProjectList;
