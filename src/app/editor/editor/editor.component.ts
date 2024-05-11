import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Volume} from "../models/volume";
import {UiService} from "../../core/services/ui.service";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent implements OnInit {
  content: any = '';
  volumes: Volume[] = [];
  pid: string = '658c66d90317ceec65bb8c80';

  constructor(private http: HttpClient,
              private ui: UiService) {
  }

  ngOnInit() {
    this.getVolumes()
  }

  // onChange($event: any) {
  //   console.log($event)
  // }

  save() {
    console.log(this.content)
  }

  addVolume() {
    this.http.post('volume/add', {name: '未命名卷', pid: this.pid}).subscribe((res) => {
      this.volumes.push(new Volume(res))
    })
  }

  getVolumes() {
    this.volumes = [];
    this.http.get(`volume/getVolumes?pid=${this.pid}`).subscribe((res: any) => {
      if (res && res.length) {
        for (const v of res) {
          this.volumes.push(new Volume(v))
        }
      }
    })
  }

  updateVolumeName(v: Volume) {
    const name = prompt('输入新的卷名');
    if (!name) {
      return
    }
    this.http.post('volume/update', {id: v.id, name}).subscribe(res => {
      if (res) {
        v.name = name;
      }
    })
  }

  deleteVolume(v: Volume) {
    const res = confirm('您确定要删除该卷吗？');
    if (!res) {
      return
    }
    this.http.post('volume/delete', {id: v.id}).subscribe(res => {
      if (res) {
        this.ui.success('删除成功')
        this.volumes = this.volumes.filter(volume => volume !== v);
      }
    })
  }
}
