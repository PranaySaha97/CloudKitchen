import { Component,Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})




export class AppComponent {

  constructor(private modalService: NgbModal) {}

  title = 'cloudkitchen-ui';
  login(){
    const modalRef = this.modalService.open(NgbdModalContent);
  }
  
}
@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h2 class="modal-title" style="color:#63a033">You would like to login as ?</h2>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
        <button type="button" (click)="cust()" class="btn btn-outline-dark">Customer</button>&nbsp;&nbsp;
        <button type="button" (click)="rest()" class="btn btn-outline-dark">Restaurant</button>&nbsp;&nbsp;
        <button type="button" (click)="delper()" class="btn btn-outline-dark">Delivery Person</button>&nbsp;&nbsp;
        <button type="button" class="btn btn-outline-danger"  (click)="admin()">Admin</button>&nbsp;&nbsp;
    </div>
    <div class="modal-footer" style="color:#63a033">
      Kindly select one to either login or register as a perticular user!!
    </div>
  `
})

export class NgbdModalContent {
  constructor(public activeModal: NgbActiveModal) {}
  cust(){

  }
  rest(){

  }
  delper(){

  }
  admin(){
    
  }
}