import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {ProjectService} from "../project.service";
import {RoleService} from "../role/role.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private ps: ProjectService,
              private rs: RoleService) {
  }

  ngOnInit(): void {
    const pid = this.route.snapshot.params['id'];
    this.ps.init(pid);
    this.rs.init(pid);
  }
}
