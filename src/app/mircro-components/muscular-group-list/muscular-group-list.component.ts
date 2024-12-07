import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MuscularGroupCardComponent } from '../muscular-group-card/muscular-group-card.component';
import { MuscularGroupService } from '../../services/muscular-group.service';
import { MuscularGroup } from '../../interfaces/muscular-group.interface';

@Component({
  selector: 'app-muscular-group-list',
  standalone: true,
  imports: [CommonModule, MuscularGroupCardComponent],
  templateUrl: './muscular-group-list.component.html',
  styleUrl: './muscular-group-list.component.css'
})
export class MuscularGroupListComponent implements OnInit {
  muscularGroups: MuscularGroup[] = [];
  @Output() groupSelected = new EventEmitter<MuscularGroup>();

  constructor(private muscularGroupService: MuscularGroupService) {}

  ngOnInit() {
    this.loadMuscularGroups();
  }

  loadMuscularGroups() {
    this.muscularGroupService.getMuscularGroups()
      .subscribe({
        next: (groups) => {
          console.log('Grupos musculares cargados:', groups);
          this.muscularGroups = groups;
        },
        error: (error) => {
          console.error('Error cargando grupos musculares:', error);
        }
      });
  }

  selectGroup(group: MuscularGroup) {
    console.log('Grupo seleccionado en MuscularGroupListComponent:', group);
    this.groupSelected.emit(group);
  }
}
