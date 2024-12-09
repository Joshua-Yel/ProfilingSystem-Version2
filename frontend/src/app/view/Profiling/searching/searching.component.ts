import { Component, OnInit } from "@angular/core";
import { SearchService } from "../../../services/search.service";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-searching',
  standalone: false,
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.css']
})
export class SearchingComponent implements OnInit {
  transactions: any;
  clericalRecords: any[] = [];
  
  constructor(private searchService: SearchService, private http: HttpClient) {}

  ngOnInit(): void {
    this.getClericalRecords();
    console.log('Transaction ID:', this.transactions?.id);
    this.searchService.getClericalRecords().subscribe(
      (data) => {
        this.clericalRecords = data; // Store data from backend
      },
      (error) => {
        console.error('Error fetching clerical records:', error);
      }
    );
  }
  fetchTransactions(): void {
    this.http.get<any[]>('https://your-api-endpoint/transactions')
      .subscribe(
        (data) => {
          this.transactions = data;
        },
        (error) => {
          console.error('Error fetching transactions:', error);
        }
      );
    }
    getClericalRecords() {
      this.searchService.searchClericalRecords().subscribe(
        (data) => {
          console.log('Data fetched:', data); // Log the raw data from the backend
          this.transactions = data.map((record) => ({
            name: this.getFullName(record.fullName), // Call getFullName to concatenate the full name
            designation: record.priestlyAssignments?.[0]?.position || 'N/A',
            location: record.priestlyAssignments?.[0]?.location || 'N/A',
            parishName: record.priestlyAssignments?.[0]?.location || 'N/A',
            id: record._id // Map _id to id for usage in your component
          }));
          console.log('Transactions:', this.transactions); // Log the processed transactions data
        },
        (error) => {
          console.error('Error fetching data:', error); // Handle any errors
        }
      );
    }
    
    // Helper method to concatenate the full name
    getFullName(fullName: { firstName: string, middleName: string, lastName: string, suffix: string | null }): string {
      const { firstName, middleName, lastName, suffix } = fullName;
      let fullNameStr = `${firstName} ${middleName ? middleName + ' ' : ''}${lastName}`;
      if (suffix) {
        fullNameStr += `, ${suffix}`;
      }
      return fullNameStr.trim();
    }
    
    
  
}
