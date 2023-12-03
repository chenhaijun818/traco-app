import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {Project} from "../models/project";
import {UiService} from "../../core/services/ui.service";
import {Track} from "../models/track";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  project?: Project;
  tracks: Track[] = [];
  tab: string = 'track';

  constructor(private http: HttpClient, private route: ActivatedRoute, private ui: UiService) {
  }

  ngOnInit(): void {
    const pid = this.route.snapshot.params['id'];
    this.http.get(`project/${pid}`).subscribe(res => {
      this.project = new Project(res);
    });
  }
}
