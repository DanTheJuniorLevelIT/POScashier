import { FormsModule, ReactiveFormsModule,FormControl } from '@angular/forms';
import { RouterModule,RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { PostService } from '../../../post.service';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { subscribe } from 'diagnostics_channel';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductFilterPipe } from '../../../product-filter.pipe';


@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [ProductFilterPipe,RouterModule,RouterOutlet, ReactiveFormsModule, RouterLink, RouterLinkActive,FormsModule,CommonModule,HttpClientModule],
  templateUrl: './view-product.component.html',
  providers:[DatePipe],
  styleUrl: './view-product.component.css'
})
export class ViewProductComponent implements OnInit{
  currentDate: Date = new Date();
  transactions: any[] = [];
  searchFilter:any;
  ototal: number = 0;
  ntotal:number = 0;
  BarcodeFailed:boolean=false;
  // Barcode:any;
  Barcode: string = '';
  Barcodeinput: string = '';
  // payment:any;
  // transaction:any;
  product:any;
  products: any[] = [];
  scannedBarcode:any;
  showModal:boolean=false;
  newTotal:boolean = false;
  showInfo:boolean = false;
  salesInfo:any = {};
  customers: any[] = [];
  payment: number = 0;
  change: number = 0;
  selectedCustomer: any; // To store the selected customer
  filteredProducts: any[] = [];
  deleteConfirmed: boolean = false;
  indexToDelete: number | null = null;
  categories: any[] = [];
  selectedCategoryId: string = 'all'; // Default to 'all'
  insufficientBalanceModalVisible: boolean = false;
  checkoutmodule: boolean = false;
  noticemodal: boolean = false;
  
  constructor(private pos:PostService,private cdr: ChangeDetectorRef){}
  setIndexToDelete(index: number) {
    this.indexToDelete = index;
  }

  confirmDelete() {
    if (this.indexToDelete !== null) {
      this.deleteConfirmed = true;
      this.removeTransaction(this.indexToDelete);
    }
  }

  removeTransaction(index: number) {
    this.transactions.splice(index, 1);
    this.originalTotal();
  }
  productTotal(transaction:any): number {
    return transaction.quantity * transaction.Price;
  }
  decreaseQuantity(transaction:any){
    if(transaction.quantity >1){
      transaction.quantity--;
      this.originalTotal();
    }
  }
  increaseQuantity(transaction:any){
      transaction.quantity++;
      this.originalTotal();
    
  }
  originalTotal(){
    this.ototal = this.transactions.reduce((acc, curr) => acc + this.productTotal(curr),0);
  }
  searchProduct(){
    if(!this.Barcode){
      console.error("Barcode is not set");
      return;
    }
    this.pos.searchProductByBarcode(this.Barcode).subscribe({
      next: (response) => {
        console.log('Response:', response);
        this.product = response;
  
        if (this.product && this.product.Barcode) {
          const newTransaction = {
            Barcode: this.product.Barcode,
            Prod_name: this.product.Prod_name,
            quantity: 1,
            Price: Number(this.product.Price)
          };
          // console.log("before",this.transactions);
          this.transactions.push(newTransaction);
          console.log("Transac",this.transactions);
          this.BarcodeFailed = false;
          this.originalTotal();
        } else {
          this.BarcodeFailed = true;
          this.cdr.detectChanges();
          console.error('Product not found');
          
        }
        console.log('Before clearing Barcode:', this.Barcode);
        this.Barcode = ''; // Clearing the input field
        console.log('After clearing Barcode:', this.Barcode);
      },
      error: (error) => {
        console.error('Error occurred:', error);
      }
    });
    
  }
  displaySalesInfo(transaction:any){
    this.showInfo = true;
    this.salesInfo = {
      Prod_name: transaction.Prod_name,
      Description: transaction.Description,
      Price: transaction.Price,
    };
  }
  searchProductWithBarcode(barcode: string) {
    this.Barcode = barcode;
    // You can perform any necessary actions here, such as searching for the product using the barcode
    console.log('Barcode clicked:', barcode);
    this.searchProduct();
  }
  fetchCustomers() {
    this.pos.getCustomers().subscribe((data: any[]) => {
      this.customers = data;
      // Assuming "CASH" is the first item in the customers array
      if (this.customers && this.customers.length > 0) {
        this.selectedCustomer = this.customers[0].CustID;
      }
    });
  }
  calculateChange() {
    this.change = this.payment - this.ototal;
  }
  checkoutmodal(){
    this.checkoutmodule = true;
    this.cdr.detectChanges(); // Manually trigger change detection
    console.log('modal checkout');
  }
  checkout(): void {
    const selectedCustomerId = this.selectedCustomer;

    // Check if the selected customer is not ID 1 and has charges
    if (selectedCustomerId !== 1 && this.customerHasCharges(selectedCustomerId)) {
        // Show modal indicating insufficient balance
        this.showInsufficientBalanceModal();
        return; // Halt the transaction process
    }

    const transactionData = {
        customerId: selectedCustomerId,
        transactions: this.transactions // Assuming this.transactions is your transactions array
    };

    this.pos.postTransactionData(transactionData.customerId, transactionData.transactions)
        .subscribe(
            (response) => {
                // Handle success response
                if (response && response.status === 'overall transaction inserted successfully.') {
                    console.log('Transaction successfully.', response)
                    this.noticemodal = true;
                } else {
                    if (response && response.message === 'Insufficient balance.') {
                        this.showInsufficientBalanceModal();
                    }
                } 
                    this.transactions = [];
                    this.originalTotal();
                    this.payment = 0;
                    this.change = 0;
                    this.fetchCustomers();
                    
            },
            (error) => {
                // Handle error response
                console.error('Error occurred while posting transaction and customer data:', error);
            }
        );
        this.checkoutmodule = false;
        
  }

    customerHasCharges(selectedCustomerId: number): boolean {
      const customer = this.customers.find(customer => customer.id === selectedCustomerId);
      if (customer && customer.charges !== null && customer.charges > customer.credit) {
        this.showInsufficientBalanceModal();

          return true; // Customer has charges exceeding credit limit
      } else {
        
          return false; // Customer has sufficient balance
      }
  }
  showInsufficientBalanceModal() {
    this.insufficientBalanceModalVisible = true;
    this.cdr.detectChanges(); // Manually trigger change detection
    console.log('modal display insuf');
  }
  closenoticemodal(){
    this.noticemodal = false;
  }
    closeInsufficientBalanceModal() {
    this.insufficientBalanceModalVisible = false;
    this.transactions = [];
    this.originalTotal();
    this.payment = 0;
    this.change = 0;
    this.fetchCustomers();
  }
  closecheckout(){
    this.checkoutmodule = false;
    // this.transactions = [];
    this.originalTotal();
    this.payment = 0;
    this.change = 0;
    this.fetchCustomers();
  }
  fetchProducts(categoryId: string): void {
    if (categoryId === 'all') {
      // If 'all' category is selected, fetch all products
      this.pos.getProducts().subscribe(
        (data) => {
          this.products = data; // Assuming 'data' is an object containing 'data' property
        },
        (error) => {
          console.error('Error fetching products: ', error);
        }
      );
    } else {
      // If a specific category is selected, fetch products by category
      this.pos.getProductsByCategory(categoryId).subscribe(
        (data) => {
          this.products = data; // Assuming 'data' is an object containing 'data' property
        },
        (error) => {
          console.error('Error fetching products by category: ', error);
        }
      );
    }
  }
  
  loadCategories() {
    this.pos.getCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }
  filterByCategory(categoryId: string) {
    this.selectedCategoryId = categoryId;
    this.fetchProducts(this.selectedCategoryId); // Fetch products based on the selected category
  }
  ngOnInit():void{
    this.fetchProducts(this.selectedCategoryId);

    this.fetchCustomers();
    this.loadCategories();
  }
  
}
interface Transaction{
  Barcode:number;
  Prod_name:string;
  Description:string;
  CatID:number;
  quantity:number;
  Price:number;
}