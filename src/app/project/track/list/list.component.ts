import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Track} from "../../models/track";
import {HttpClient} from "@angular/common/http";
import {TrackService} from "../track.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  pid = '';
  tracks: Track[] = [];
  trackMap: Map<string, Track> = new Map();
  visibles: any[] = [];

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private trackService: TrackService) {
  }

  ngOnInit(): void {
    const parent = this.route.parent?.parent;
    this.pid = parent?.snapshot.params['id'];
    this.getTracks();
  }

  getTracks() {
    this.http.get('project/track/tracks', {params: {pid: this.pid}}).subscribe((res: any) => {
      if (res && res.length) {
        this.tracks = [];
        this.trackMap.clear();
        res.forEach((t: any) => {
          const track = new Track(t);
          this.tracks.push(track);
          this.trackMap.set(track.id, track);
        });
        this.visibles = this.tracks.filter(t => t.visible).map(t => t.id);
      }
    })
  }

  onChange(ids: any) {
    const oldIds = this.tracks.filter(t => t.visible).map(t => t.id);
    const newIds = ids;
    const a = newIds.filter((id: string) => !oldIds.find(vid => vid === id));
    const b = oldIds.filter((vid: string) => !newIds.find((id: string) => id === vid));
    let id: any = '';
    let flag = false;
    if (a.length) {
      id = a.pop();
      flag = true;
    }
    if (b.length) {
      id = b.pop();
      flag = false;
    }
    this.http.post('project/track/update', {id, visible: flag}).subscribe((res: any) => {
      if (res) {
        const track: any = this.trackMap.get(id);
        track.visible = flag;
        this.trackService.trackSubject.next(track);
      }
    })
  }
}
