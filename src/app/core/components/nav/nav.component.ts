import {Component, OnInit} from '@angular/core';
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  username = '';

  constructor(public app: AppService) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.app.logout();
  }
}
