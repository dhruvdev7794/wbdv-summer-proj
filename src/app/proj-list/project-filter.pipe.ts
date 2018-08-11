import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'projectFilter'
})
export class ProjectFilterPipe implements PipeTransform {
  transform(projects, searchProj) {
    if (!projects || !searchProj) {
      return projects;
    }
    return projects.filter(project => project.projName.toLowerCase().indexOf(searchProj.toLowerCase()) !== -1);
  }

}
