import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VoiceService } from '../../Services/voice.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
export interface CompletionStatus {
  label: string;  // Example: "Approved", "Pending", "Rejected"
  percentage: number; // Example: 75, 45, etc.
  status: string; // Example: "approved", "pending", "rejected"
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  claimsPerPage = 3;  
  currentPage = 1;
  private transcriptSubscription: Subscription | undefined;
  claimsData:any = [
    { 'Claim ID': '001', 'Claimant Name': 'John Doe', 'Injury Type': 'Back Injury', 'Claim Amount': '$5,000', 'Status': 'Pending', 'Date Filed': '2024-01-15', 'Completion Status': { label: 'In Progress', percentage: 45, status: 'in-progress' } },
    { 'Claim ID': '002', 'Claimant Name': 'Jane Smith', 'Injury Type': 'Wrist Fracture', 'Claim Amount': '$12,000', 'Status': 'Approved', 'Date Filed': '2024-02-10', 'Completion Status': { label: 'Completed', percentage: 100, status: 'approved' } },
    { 'Claim ID': '003', 'Claimant Name': 'Michael Johnson', 'Injury Type': 'Sprained Ankle', 'Claim Amount': '$2,500', 'Status': 'Rejected', 'Date Filed': '2024-03-05', 'Completion Status': { label: 'Incomplete', percentage: 0, status: 'incomplete' } },
    { 'Claim ID': '004', 'Claimant Name': 'Sarah Williams', 'Injury Type': 'Shoulder Dislocation', 'Claim Amount': '$8,700', 'Status': 'Pending', 'Date Filed': '2024-04-01', 'Completion Status': { label: 'In Progress', percentage: 65, status: 'in-progress' } },
    { 'Claim ID': '005', 'Claimant Name': 'Chris Brown', 'Injury Type': 'Head Injury', 'Claim Amount': '$20,000', 'Status': 'Approved', 'Date Filed': '2024-05-18', 'Completion Status': { label: 'Completed', percentage: 100, status: 'approved' } },
    { 'Claim ID': '006', 'Claimant Name': 'Emma Watson', 'Injury Type': 'Neck Sprain', 'Claim Amount': '$3,500', 'Status': 'Rejected', 'Date Filed': '2024-06-12', 'Completion Status': { label: 'Incomplete', percentage: 0, status: 'incomplete' } },
    { 'Claim ID': '007', 'Claimant Name': 'David Miller', 'Injury Type': 'Broken Leg', 'Claim Amount': '$15,000', 'Status': 'Pending', 'Date Filed': '2024-07-20', 'Completion Status': { label: 'In Progress', percentage: 30, status: 'in-progress' } },
  ];
  
  filteredClaims = [...this.claimsData];
  searchTerm = '';

  tableColumns = [
    'Claim ID',
    'Claimant Name',
    'Injury Type',
    'Claim Amount',
    'Status',
    'Date Filed',
    'Completion Status',
    'Process Claim',
  ];

  constructor(public voiceService:VoiceService, private cdRef: ChangeDetectorRef, public router: Router) {}
  ngOnInit() {
    this.transcriptSubscription=this.voiceService.transcript$.subscribe(transcript => {
      console.log(transcript);
      if (transcript.includes("show me claim details")) {
        this.scrollToTable();
      } else {
        console.log('error occured while listening'+transcript);
      }
      this.cdRef.detectChanges(); 
    });

    // this.voiceService.startListening();
  }
  ngOnDestroy() {
    if (this.transcriptSubscription) {
      this.transcriptSubscription.unsubscribe();
      this.voiceService.stopListening();
      this.cdRef.detectChanges();
    }
  }
  scrollToTable() {
    setTimeout(() => {
      const tableElement = document.getElementById("claimsTable");
      if (tableElement) {
        tableElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 200);
  }
  filterClaims() {
    this.filteredClaims = this.claimsData.filter((claim: { [s: string]: unknown; } | ArrayLike<unknown>) =>
      Object.values(claim).some((value:any) =>
        value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'Completed':
        return 'bg-green-600 text-white';
      case 'In Progress':
        return 'bg-yellow-500 text-black';
      case 'Denied':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-400 text-white';
    }
  }

  viewClaim(claimId: string) {
    alert(`Viewing claim details for Claim ID: ${claimId}`);
  }
  getStatusTextColor(status: CompletionStatus): string {
    if (!status) return 'text-gray-700 dark:text-gray-400'; 
    switch (status.status) {
      case 'approved': return 'text-green-700 dark:text-green-500';
      case 'pending': return 'text-yellow-700 dark:text-yellow-500';
      case 'rejected': return 'text-red-700 dark:text-red-500';
      case 'in-progress': return 'text-blue-700 dark:text-blue-500';
      case 'on-hold': return 'text-indigo-700 dark:text-indigo-500';
      default: return 'text-gray-700 dark:text-gray-400';
    }
  }
  
  getStatusBarColor(status: CompletionStatus): string {
    if (!status) return 'bg-gray-600 dark:bg-gray-400'; 
    switch (status.status.toLowerCase()) { 
      case 'approved': return 'bg-green-500 dark:bg-green-400 bg-opacity-100';
      case 'pending': return 'bg-yellow-500 dark:bg-yellow-400 bg-opacity-100';
      case 'incomplete': return 'bg-red-500 dark:bg-red-400 bg-opacity-100'; 
      case 'in-progress': return 'bg-blue-500 dark:bg-blue-400 bg-opacity-100';
      case 'on-hold': return 'bg-indigo-500 dark:bg-indigo-400 bg-opacity-100';
      default: return 'bg-gray-600 dark:bg-gray-400 bg-opacity-100';
    }
  }
  get totalPages(): number {
    return Math.ceil(this.filteredClaims.length / this.claimsPerPage);
  }
  
  get paginatedClaims() {
    const startIndex = (this.currentPage - 1) * this.claimsPerPage;
    return this.filteredClaims.slice(startIndex, startIndex + this.claimsPerPage);
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
  
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  
}