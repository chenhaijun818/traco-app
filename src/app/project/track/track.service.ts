import {Injectable} from '@angular/core';
import {Track} from "../models/track";
import {Subject} from "rxjs";
import {Affair} from "../models/affair";
import {Project} from "../models/project";

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  pid: string = '';
  project: Project | any;
  trackSubject: Subject<Track> = new Subject();
  affairSubject: Subject<Affair> = new Subject();
  deleteAffairSubject: Subject<Affair> = new Subject();
  tracks: Track[] = [];
  trackMap: Map<string, Track> = new Map();
  affairs: Affair[] = [];
  affairMap: Map<string, Affair> = new Map();
  constructor() {
  }

  async init(pid: string) {
    this.pid = pid;
    this.tracks = [];
    this.affairs = [];
  }

  getProject() {

  }

  getTracks() {
  }

  getAffairs() {
  }

  addTrack() {
  }

  deleteTrack() {
  }

  updateTrack() {
  }

  addAffair() {
  }

  deleteAffair() {
  }

  updateAffair() {
  }

}
