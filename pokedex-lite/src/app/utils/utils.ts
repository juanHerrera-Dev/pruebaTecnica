import { Injectable } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "../modal/modal.component";

@Injectable()
export class Utils {
    constructor(private modalService: NgbModal){}

    abrirModal(error:any){
      const modalRef = this.modalService.open(ModalComponent,{ size: 'lg', centered: true });
      modalRef.componentInstance.confirmationModal= false;
      modalRef.componentInstance.message = "error in Login, error: " + error.message;
    }
}