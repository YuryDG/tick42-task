import React from 'react';
import { Project } from '../types';

type Props = {
  project: Project
}
const ProjectListItem = ({ project }: Props): JSX.Element => (
  <li>{project.name}</li>
);

export default ProjectListItem;
