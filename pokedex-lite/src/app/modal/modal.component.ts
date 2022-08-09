import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  
  @Input() message!:string;
  @Input() confirmationModal:boolean= true;

  constructor(public activeModal: NgbActiveModal) {

  }
}
