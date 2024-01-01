import {Injectable} from '@angular/core';
import {Track} from "../models/track";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  trackSubject: Subject<Track> = new Subject();

  constructor() {
  }
}
