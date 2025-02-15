import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { PostService } from '../../../post.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
import {NgxPrintModule} from 'ngx-print';
@Component({
  selector: 'app-view-daily-sales',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    CommonModule,
    HttpClientModule,
    NgxPrintModule
  ],
  templateUrl: './view-daily-sales.component.html',
  styleUrl: './view-daily-sales.component.css',
})

export class ViewDailySalesComponent implements OnInit{
  date: string = '';
  time: string = '';
  totalsSales: number = 0;
  totalChargesSales: number = 0;
  transactionDetails: TransactionDetail[] = [];
  transactionChargesDetails: TransactionDetail[] = [];
  dates: string[] = [];
  startDate: string = ''; // Initialize with default values if needed
  endDate: string = ''; // Initialize with default values if needed
  constructor(private daily: PostService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const today = new Date();
    this.date = today.toISOString().slice(0, 10);
    this.time = today.toTimeString().slice(0, 8);
    this.getdailyTransactionDetails();
    this.getTransactionHistory();
    this.getdailyTransactionChargesDetails();
  }
  calculateTotalSales(): number {
    return this.totalsSales + this.totalChargesSales;
  }
  
  
  getdailyTransactionDetails() {
    const transactionId = 1;
    this.daily.getdailyTransactionDetails(transactionId).subscribe(
      (response: any) => {
        console.log('Response:', response); // Log the response
        if (response.transactionDetails) {
          // Parse and store transaction details
          this.transactionDetails = response.transactionDetails;
          // Calculate total sales
          this.totalsSales = response.totalSales;
        } else {
          console.error('Error: No transaction details found'); // Log the error
        }
      },
      (error) => {
        console.error('Error fetching daily transaction details:', error); // Log the error
      }
    );
  }
  getdailyTransactionChargesDetails() {
    const transactionId = 1;
    this.daily.getdailyTransactionChargesDetails(transactionId).subscribe(
      (response: any) => {
        console.log('Response:', response); // Log the response
        if (response.transactionChargesDetails) {
          // Parse and store transaction details
          this.transactionChargesDetails = response.transactionChargesDetails;
          // Calculate total sales
          this.totalChargesSales = response.totalChargesSales;
        } else {
          console.error('Error: No transaction details found'); // Log the error
        }
      },
      (error) => {
        console.error('Error fetching daily transaction details:', error); // Log the error
      }
    );
  }
  getTransactionHistory(): void {
    this.daily.getTransactions().subscribe((result: any) => {
      this.dates = result;
      console.log("dates:", this.dates); // Verify if dates are populated
    });
  }
  
  print() {
    const elementToPrint: any = document.getElementById('Report');
    const pdfWidth = 210; // Width of the PDF document in mm (A4 size)
    const pdfHeight = (elementToPrint.clientHeight / elementToPrint.clientWidth) * pdfWidth;
  
    html2canvas(elementToPrint, { scale: 2 }).then((canvas) => {
      const pdf = new jsPDF('p', 'mm', 'a4'); // Create a new PDF with A4 dimensions
      const imgData = canvas.toDataURL('image/png');
  
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('DailysalesReport.pdf');
    });
  }

}
interface TransactionDetail {
  TransacDetID: number;
  transactionID: number;
  Barcode: string;
  Price: number;
  quantity: number;
  Name: string; // Product name
  Size: string; // Product size
  Firstname: string;
  Lastname: string;
}
interface TransactionDetail {
  transactionID: number;
  // Include TransactionDate property
  TransactionDate: string;
  // Other properties...
}