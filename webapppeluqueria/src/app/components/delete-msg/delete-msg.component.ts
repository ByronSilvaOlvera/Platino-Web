import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-msg',
  templateUrl: './delete-msg.component.html',
  styleUrls: ['./delete-msg.component.scss']
})
export class DeleteMsgComponent implements OnInit {

  @Input() iconclass:string = "fas fa-exclamation-circle"
  @Input() msg:string ="No tiene Autorizacion para eliminar un Cliente"
  @Input() color : string ="color-danger"
  @Input() colormsg : string = "color-msg"
  constructor() { }

  ngOnInit(): void {
  }

}
