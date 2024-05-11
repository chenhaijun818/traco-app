import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent implements OnInit {
  content: any = '';

  ngOnInit() {
  }

  // onChange($event: any) {
  //   console.log($event)
  // }

  save() {
    console.log(this.content)
  }
}
