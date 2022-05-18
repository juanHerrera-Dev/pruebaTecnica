import { Injectable, Output, EventEmitter } from '@angular/core';



/*servicio creado para emitir datos de un componente a otro,y no mezclar con el servicio de api*/
@Injectable({
  providedIn: 'root'
})
export class EmitterService {
  @Output() dataEmitter: EventEmitter<any> = new EventEmitter();
  constructor() { }
}
