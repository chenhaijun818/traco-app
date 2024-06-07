import {Injectable} from '@angular/core';
import {Thing} from "../models/thing";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThingService {
  pid: string = '';
  things: Thing[] = [];
  thingMap: Map<string, Thing> = new Map();
  things$ = new BehaviorSubject<Thing[]>([]);

  constructor(private http: HttpClient) {
  }

  getThings(pid: string) {
    return this.http.get(`project/thing/things?pid=${pid}`).subscribe((res: any) => {
      for (const t of res) {
        let thing = this.thingMap.get(t._id);
        if (thing) {
          thing.update(t);
        } else {
          thing = new Thing(t);
          this.things.push(thing);
          this.thingMap.set(thing.id, thing);
        }
      }
      this.things$.next(this.things);
    });
  }

  getThing(id: string) {
    return this.thingMap.get(id);
  }

  addThing(thing: Thing) {
    this.things.push(thing);
    this.thingMap.set(thing.id, thing);
    this.things$.next(this.things);
  }

  removeThing(thing: Thing) {
    this.thingMap.delete(thing.id);
    this.things = [...this.thingMap.values()];
    this.things$.next(this.things)
  }

}
