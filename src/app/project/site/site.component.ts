import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UiService} from "../../core/services/ui.service";
import {Site} from "../models/site";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {
  sites: Site[] = [];
  pid = '';
  constructor(private http: HttpClient,
              private ui: UiService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const parent: ActivatedRoute | any = this.route.parent;
    this.pid = parent.snapshot.params['id'];
    this.getSites();
  }

  addSite() {
    const name = prompt('请输入地点名称');
    if (!name) {
      return
    }
    this.http.post('project/site/add', {name, pid: this.pid}).subscribe((res: any) => {
      if (res) {
        this.ui.success('新增成功');
        this.sites.push(new Site(res))
      }
    })
  }

  getSites() {
    this.http.get(`project/site/sites?pid=${this.pid}`).subscribe((sites: any) => {
      if (sites && sites.length) {
        this.sites = [];
        for (const site of sites) {
          this.sites.push(new Site(site))
        }
      }
    })
  }

  deleteSite(site: Site) {
    const res = confirm('您确定要删除该地点吗？')
    if (!res) {
      return;
    }
    this.http.post('project/site/delete', {id: site.id}).subscribe((res: any) => {
      if (res) {
        this.sites = this.sites.filter(s => s.id !== site.id);
      }
    })
  }

  updateSite(site: Site, key: 'name' | 'address' | 'desc') {
    const value = prompt('请输入新的值', site[key]);
    if (!value) {
      return;
    }
    this.http.post('project/site/update', {id: site.id, [key]: value}).subscribe((res: any) => {
      if (res) {
        site[key] = value;
      }
    })
  }
}
