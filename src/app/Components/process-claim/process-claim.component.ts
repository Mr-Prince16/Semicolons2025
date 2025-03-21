import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-process-claim',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './process-claim.component.html',
  styleUrl: './process-claim.component.css'
})
export class ProcessClaimComponent implements OnInit {
  claimId: string = '';
  currentStep: number = 0;
  loading: boolean = false;
  output: string = '';

  steps = [
    { 
      title: 'Fraud Detection', 
      description: 'Analyzes claim history and policyholder behavior to detect fraudulent cases.', 
      response: 'No fraud detected. The claim appears to be valid.'
    },
    { 
      title: 'Long Claim Detection', 
      description: 'Identifies claims that have been pending for a long time and need further review.', 
      response: 'This claim has been open for 60 days. Further review recommended.'
    },
    { 
      title: 'Reserve Prediction', 
      description: 'Estimates the financial reserve required to process the claim effectively.', 
      response: 'Estimated reserve for this claim is $12,500 based on historical data.'
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.claimId = this.route.snapshot.paramMap.get('id') || '';
  }

  performSuperAgentOperation() {
    this.loading = true;
    this.output = '';
//API call here
    setTimeout(() => {
      this.loading = false;
      this.output = this.steps[this.currentStep].response;
    }, 2000);
  }

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.output = '';
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.output = '';
    }
  }
  handleAction(action: string) {
    alert(`Action Selected: ${action}`);
  }
  
}
