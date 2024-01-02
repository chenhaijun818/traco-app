import {Injectable} from '@angular/core';
import {Track} from "../models/track";
import {Subject} from "rxjs";
import {Affair} from "../models/affair";

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  trackSubject: Subject<Track> = new Subject();
  affairSubject: Subject<Affair> = new Subject();
  constructor() {
  }
}
