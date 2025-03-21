import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent {
  claimTimelineData = [
    {
      date: 'March 19, 2025',
      claims: [
        {
          id: 'C1024',
          status: 'Approved',
          description: 'Claim approved for worker compensation.',
          icon: 'assets/icons/approved.svg',
        },
        {
          id: 'C1025',
          status: 'Pending',
          description: 'Claim submitted and awaiting review.',
          icon: 'assets/icons/pending.svg',
        },
      ],
    },
    {
      date: 'March 18, 2025',
      claims: [
        {
          id: 'C1019',
          status: 'Rejected',
          description: 'Claim rejected due to insufficient evidence.',
          icon: 'assets/icons/rejected.svg',
        },
      ],
    },
  ];
}
