import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isSidebarVisible: boolean = false;
  constructor(public router:Router){

  }
    @HostListener('document:mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
      // Show sidebar when mouse is near the left edge (first 50px)
      if (event.clientX < 50) {
        this.isSidebarVisible = true;
      } 
      // Hide sidebar if mouse moves more than 200px away from the left
      else if (event.clientX > 200) {
        this.isSidebarVisible = false;
      }
    }
  
    @HostListener('mouseleave', ['$event'])
    onMouseLeave() {
      // Hide sidebar when the mouse leaves the sidebar
      this.isSidebarVisible = false;
    }
}
