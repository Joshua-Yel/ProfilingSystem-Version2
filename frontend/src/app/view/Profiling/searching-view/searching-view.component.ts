import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from "../../../services/search.service";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-searching-view',
  standalone: false,
  
  templateUrl: './searching-view.component.html',
  styleUrl: './searching-view.component.css'
})
export class SearchingViewComponent {
  transactionId: string = '';
  transactionDetails: any; 
  isEditable: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private SearchService: SearchService, 
     private http: HttpClient
  ) {}
  toggleEdit(){
    this.isEditable =!this.isEditable;
  }
  fetchTransactions(): void {
    this.http.get<any[]>('https://your-api-endpoint/transactions')
      .subscribe(
        (data) => {
          this.transactionDetails = data;
        },
        (error) => {
          console.error('Error fetching transactions:', error);
        }
      );
    }
  ngOnInit(): void {
    // Subscribe to the route parameters to get the 'id'
    this.route.params.subscribe((params) => {
      this.transactionId = params['id'];  // Get the 'id' from the URL

      // Fetch transaction details based on the 'id'
      if (this.transactionId) {
        this.SearchService.getTransactionById(this.transactionId).subscribe(
          (data) => {
            this.transactionDetails = data;
            console.log(this.transactionDetails); // Verify the details fetched
          },
          (error) => {
            console.error('Error fetching transaction details', error);
          }
        );
      }
    });
  }

  // Method to print the page (for mockup document)
  printMockupDocument(): void {
    window.print();
  }
}