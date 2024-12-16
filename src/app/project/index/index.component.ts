import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProjectService} from "../project.service";
import {RoleService} from "../role/role.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private ps: ProjectService,
              private rs: RoleService,
              private title: Title) {
  }

  ngOnInit(): void {
    const pid = this.route.snapshot.params['id'];
    this.ps.init(pid);
    this.rs.init(pid);
    this.ps.project$.subscribe((res: any) => {
      this.title.setTitle(res.name)
    });
  }
}
