import {Injectable} from '@angular/core';
import {Project} from "./models/project";
import {HttpClient} from "@angular/common/http";
import {Affair} from "./models/affair";
import {Role} from "./models/role";
import {Site} from "./models/site";
import {Track} from "./models/track";

@Injectable()
export class ProjectService {
  pid: string = '';
  project: Project | any;
  tracks: Track[] = [];
  trackMap: Map<string, Track> = new Map();
  affairs: Affair[] = [];
  affairMap: Map<string, Affair> = new Map();
  roles: Role[] = [];
  roleMap: Map<string, Role> = new Map();
  sites: Site[] = [];
  siteMap: Map<string, Site> = new Map();

  constructor(private http: HttpClient) {
  }

  init(pid: string) {
    this.project = null;
    this.tracks = [];
    this.trackMap.clear();
    this.affairs = [];
    this.affairMap.clear();
    this.roles = [];
    this.roleMap.clear();
    this.sites = [];
    this.siteMap.clear();
    this.pid = pid;
    this.getProject();
    this.getTracks();
    this.getAffairs();
    this.getRoles();
    this.getSites();
  }

  getProject() {
    this.http.get(`project/${this.pid}`).subscribe((res: any) => {
      this.project = new Project(res);
    });
  }

  getTracks() {
    this.http.get(`project/track/tracks?pid=${this.pid}`).subscribe((res: any) => {
      for (const t of res) {
        const track = new Track(t);
        this.tracks.push(track);
        this.trackMap.set(track.id, track);
      }
    });
  }

  getAffairs() {
    this.http.get(`project/affair/affairs?pid=${this.pid}`).subscribe((res: any) => {
      for (const r of res) {
        const affair = new Affair(r);
        this.affairs.push(affair);
        this.affairMap.set(affair.id, affair);
      }
    });
  }

  getRoles() {
    this.http.get(`project/role/roles?pid=${this.pid}`).subscribe((res: any) => {
      for (const r of res) {
        const role = new Role(r);
        this.roles.push(role);
        this.roleMap.set(role.id, role);
      }
    });
  }

  getSites() {
    this.http.get(`project/site/sites?pid=${this.pid}`).subscribe((res: any) => {
      for (const s of res) {
        const site = new Site(s);
        this.sites.push(site);
        this.siteMap.set(site.id, site);
      }
    });
  }
}
