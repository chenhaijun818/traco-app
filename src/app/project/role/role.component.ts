import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  options = ['全部', '男性', '女性'];
  constructor() { }

  ngOnInit(): void {
  }

}
