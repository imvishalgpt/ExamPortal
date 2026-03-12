import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-students',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-students.component.html',
  styleUrl: './admin-students.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AdminStudentsComponent implements OnInit {

  students: any[] = [];
  filteredStudents: any[] = [];
  searchTerm: string = '';
  isLoading: boolean = true;

  // Color palette for avatars
  private avatarColors = [
    '#3d5af1', '#7c3aed', '#0ea47a', '#e8245e',
    '#f59e0b', '#0891b2', '#dc2626', '#059669'
  ];

  constructor(private _user: UserService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.isLoading = true;
    this._user.getAllUsers().subscribe(
      (data: any) => {
        this.students = data;
        this.filteredStudents = data;
        this.isLoading = false;
      },
      (error) => {
        console.error(error);
        this.isLoading = false;
        Swal.fire('Error', 'Failed to load students', 'error');
      }
    );
  }

  filterStudents() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredStudents = this.students;
      return;
    }
    this.filteredStudents = this.students.filter(s =>
      s.username?.toLowerCase().includes(term) ||
      s.firstname?.toLowerCase().includes(term) ||
      s.lastname?.toLowerCase().includes(term) ||
      s.email?.toLowerCase().includes(term) ||
      s.phone?.toLowerCase().includes(term)
    );
  }

  getActiveCount(): number {
    return this.students.filter(s => s.enabled).length;
  }

  getAvatarColor(index: number): string {
    return this.avatarColors[index % this.avatarColors.length];
  }

  deleteStudent(id: number, username: string) {
    Swal.fire({
      title: `Delete ${username}?`,
      text: 'This will permanently remove the student.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: '#e8245e'
    }).then(result => {
      if (result.isConfirmed) {
        this._user.deleteUser(id).subscribe(
          () => {
            this.students = this.students.filter(s => s.id !== id);
            this.filteredStudents = this.filteredStudents.filter(s => s.id !== id);
            Swal.fire('Deleted', `${username} has been removed.`, 'success');
          },
          (error) => {
            Swal.fire('Error', 'Failed to delete student', 'error');
          }
        );
      }
    });
  }
}