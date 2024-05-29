import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { PostService } from '../../../post.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SearchFilterByDatePipe } from '../../../datepipe.pipe';
import { ProductFilterPipe } from '../../../product-filter.pipe';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
import {NgxPrintModule} from 'ngx-print';
@Component({
  selector: 'app-viewreturn',
  standalone: true,

  imports: [ProductFilterPipe,SearchFilterByDatePipe,RouterModule,RouterOutlet, ReactiveFormsModule, RouterLink, RouterLinkActive,FormsModule,CommonModule,HttpClientModule,  NgxPrintModule,],
  templateUrl: './viewreturn.component.html',
  styleUrl: './viewreturn.component.css'
})
export class ViewreturnComponent implements OnInit{
  customers: any[] = [];
  selectedCustomer: any;
  returnProduct: any;
  replacementProduct: any;
  returnBarcode: any;
  replacementBarcode: any;
  transactionData:any;
  products: any[] = [];
  error: string | null = null;
  ret: any;
  searchFilter:any;
  categories: any[] = [];
  startDate: string = ''; // Initialize with default values if needed
  endDate: string = ''; // Initialize with default values if needed
  selectedCategoryId: string = 'all'; // Default to 'all'
  Barcode: string = '';
  // ret: any[] = []; // Assuming this is your array of return items
  constructor(private returns:PostService,private cdr: ChangeDetectorRef,private pos:PostService){}
  ngOnInit(): void {
    this.fetchCustomers();
    this.getReturn();
    this.fetchProducts();
  }
  getReturn(): void {
    this.returns.getReturns().subscribe((result: any) => {
      this.ret = result;
      console.log("returns:", this.ret); 
    });
  }
  
  fetchCustomers() {
    this.returns.getCustomers().subscribe((data: any[]) => {
      this.customers = data;
      // Assuming "CASH" is the first item in the customers array
      if (this.customers && this.customers.length > 0) {
        this.selectedCustomer = this.customers[0].CustID;
      }
    });
  }
  searchProduct(): void {
    if (!this.returnBarcode || !this.replacementBarcode) {
      alert('Please scan both return and replacement products.');
      return;
    }

    this.returns.searchReturnReplace(this.returnBarcode, this.replacementBarcode)
      .subscribe(
        (response: any) => {
          if (response.error) {
            this.error = response.error;
            this.products = [];
          } else {
            this.products = response;
            this.error = null;
          }
        },
        error => {
          console.error('An error occurred:', error);
          this.error = 'An error occurred while searching for products.';
          this.products = [];
        }
      );
  }
  searchProductWithBarcode(barcode: any) {
    if (!this.returnBarcode) {
        this.returnBarcode = barcode;
        console.log('Barcode clicked:', barcode);
        this.onReturnBarcodeChange();
    } else {
        this.replacementBarcode = barcode;
        console.log('Replacement barcode clicked:', barcode);
        this.checkout();
        
    }
  }
  
  onReturnBarcodeChange() {
    console.log('Return Barcode changed:', this.returnBarcode);
    // Switch focus to replacementBarcode if element exists
    const replacementBarcodeInput = document.getElementById('myInput1');
    // if (replacementBarcodeInput) {
    //     replacementBarcodeInput.focus();
    // }
  }
  onReplacementBarcodeChange(barcode: string) {
    this.replacementBarcode = barcode;
    console.log('Replacement Barcode changed:', this.replacementBarcode);
    // Automatically submit the form
    this.searchProduct();
  }

  
  fetchProducts(): void {
      this.pos.getProducts().subscribe(
        (data) => {
          this.products = data; // Assuming 'data' is an object containing 'data' property
        },
        (error) => {
          console.error('Error fetching products by category: ', error);
        }
      );
    
  }
  checkout(): void {
    
    console.log('Selected customer:', this.selectedCustomer);
    console.log('Return product:', this.returnBarcode);
    console.log('Replacement product:', this.replacementBarcode);

    if (!this.selectedCustomer || !this.returnBarcode || !this.replacementBarcode) {
        console.error('Please fill all fields.'); // Log the error message
        // alert('An error occurred while processing your request. Please try again.');
        return;
    }

    const transactionData = {
        customerId: this.selectedCustomer,
        transactions: [
            {
                returnprod: this.returnBarcode,
                replacementprod: this.replacementBarcode,
                returnBarcode: this.returnBarcode,
                replacementBarcode: this.replacementBarcode
            }
        ]
    };
    console.log('Transaction data:', transactionData);

    this.returns.postreturnreplace(transactionData.customerId, transactionData.transactions[0].returnprod, transactionData.transactions[0].replacementprod)
        .subscribe(
            (response) => {
                // Handle success response
                console.log('Transaction and customer data posted successfully:', response);
                // Clear the form fields after successful submission
                this.selectedCustomer = null;
                this.returnProduct = '';
                this.replacementProduct = '';
                this.returnBarcode = '';
                this.replacementBarcode = '';
            },
            (error) => {
                this.fetchCustomers();
                this.returnProduct = '';
                this.replacementProduct = '';
                this.returnBarcode = '';
                this.replacementBarcode = '';
                this.getReturn();
            }
        );

}
  searchReturnProduct() {
    // Additional logic for handling the scanned return product
    this.returnProduct = this.returnBarcode; // Assuming direct assignment
  }

  searchReplacementProduct() {
    // Additional logic for handling the scanned replacement product
    this.replacementProduct = this.replacementBarcode; // Assuming direct assignment
  }

  print() {
    const elementToPrint: any = document.getElementById('Report');
    const pdfWidth = 210; // Width of the PDF document in mm (A4 size)
    const pdfHeight = (elementToPrint.clientHeight / elementToPrint.clientWidth) * pdfWidth;
  
    html2canvas(elementToPrint, { scale: 2 }).then((canvas) => {
      const pdf = new jsPDF('p', 'mm', 'a4'); // Create a new PDF with A4 dimensions
      const imgData = canvas.toDataURL('image/png');
  
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('ReturnReport.pdf');
    });
  }

}