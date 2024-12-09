import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  private baseUrl: string = "http://localhost:5000/api/clerical";  // Your backend API URL

  constructor(private http: HttpClient) {}
  // Fetch the clerical records
  searchClericalRecords(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl); // Get request to the API
  }

  getClericalRecordById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  getClericalRecords(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  getTransactions(): Observable<any> {
    return this.http.get<any>(this.baseUrl);  // Fetch all transactions
  }

  getTransactionById(id: string) {
    const url = `http://localhost:5000/api/clerical/${id}`; // Replace with your API endpoint
    return this.http.get<any>(url);
  }
  
}
