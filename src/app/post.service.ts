import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  url = "http://localhost/nlahPOS2/";

  constructor(private http: HttpClient) { }

  login(log: any){
    return this.http.post(this.url + 'cashierlogin.php',JSON.stringify(log));
  }
  getProducts(): Observable<any> {
    return this.http.get<any>(this.url + 'getproduct.php');
  }
  
  searchProductByBarcode(Barcode: string): Observable<any> {
    const formData = new FormData();
    formData.append('barcode', Barcode);
    return this.http.post<any>(this.url + 'searchBarcode.php', formData);
  }
  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'getcustomer.php');
  }
  postTransactionData(customerId: any, transactions: any[]): Observable<any> {
    return this.http.post<any>(this.url + 'checkout.php', { customerId, transactions });
  }
  getdailyTransactionDetails(transactionId: number) {
    return this.http.post<any>(this.url + 'getdailytransaction.php', { transactionId });
  }
  getdailyTransactionChargesDetails(transactionId: number) {
    return this.http.post<any>(this.url + 'getdailycharges.php', { transactionId });
  }
  
  getTransactions(){
    return this.http.get(this.url + 'gettransactionhistory.php');
  }
  searchReturnReplace(returnBarcode: any, replacementBarcode: any): Observable<any> {
    const body = {
      return: returnBarcode,
      replace: replacementBarcode
    };

    return this.http.post<any>(this.url + 'returnsearch.php', body);
  }
  postreturnreplace(customerId: any, returnProduct: any, replacementProduct: any): Observable<any> {
    const return_date = new Date().toISOString().split('T')[0]; // Current date
    const body = {
        CustID: customerId,
        returnprod: returnProduct,
        replacementprod: replacementProduct,
        return_date: return_date
    };
    return this.http.post<any>(this.url + 'postreturnreplace.php', body, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    });
  }
  getReturns(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'getreturns.php');
  }
  
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}getcategory.php`);
  }
  getProductsByCategory(categoryId: string): Observable<any> {
    return this.http.get<any>(this.url + 'get_products_by_category.php?categoryId=' + categoryId);
  }
  
  getremittance(){
    return this.http.get(this.url + 'remit.php');
  }

  submitremittance(data:any){
    return this.http.post(this.url +'saverem.php',JSON.stringify(data));
  }
  
}
