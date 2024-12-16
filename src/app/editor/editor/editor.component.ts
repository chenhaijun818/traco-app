import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Volume} from "../models/volume";
import {UiService} from "../../core/services/ui.service";
import {Chapter} from "../models/chapter";
import {ClientService} from "../../core/services/client.service";
import {Editor} from 'ngx-editor';
import {ActivatedRoute} from "@angular/router";
import {Project} from "../../project/models/project";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent implements OnInit {
  volumes: Volume[] = [];
  volumeMap: Map<string, Volume> = new Map();
  pid: string = '';
  selectedChapter: Chapter | null = null;
  editor: Editor;
  autoSaveTimer: any;
  volumeManaging: boolean = false;
  chapterManaging: boolean = false;
  wordCount = 0;

  project: Project | null = null;

  constructor(private http: HttpClient,
              private ui: UiService,
              private client: ClientService,
              private route: ActivatedRoute,
              private title: Title) {
    this.editor = new Editor({
      history: true,
      keyboardShortcuts: true,
    });
    this.editor.valueChanges.subscribe((res: any) => {
      if (res.content && res.content.length) {
        this.wordCount = 0;
        for (const p of res.content) {
          if (p.content && p.content.length) {
            for (const t of p.content) {
              this.wordCount += t.text.length;
            }
          }
        }
      }
    })
  }

  ngOnInit() {
    this.pid = this.route.snapshot.params['id'];
    this.getVolumes().then(() => {
      this.getChapters()
    });
    this.getProject();
  }

  getProject() {
    this.http.get(`project/${this.pid}`).subscribe((res: any) => {
      this.project = new Project(res);
      this.title.setTitle(this.project.name)
    });
  }

  onChange() {
    if (this.autoSaveTimer) {
      clearTimeout(this.autoSaveTimer);
      this.autoSaveTimer = null;
    }
    this.autoSaveTimer = setTimeout(() => {
      const {id, content} = this.selectedChapter!;
      this.client.post('chapter/update', {id, content}).then(() => {
        clearTimeout(this.autoSaveTimer);
        this.autoSaveTimer = null;
      })
    }, 3000);
  }

  save() {
    if (!this.selectedChapter || !this.selectedChapter.content) {
      return;
    }
    const {id, content} = this.selectedChapter;
    this.client.post('chapter/update', {id, content}).then(res => {
      if (!res) {
        this.ui.error('保存失败，请稍后重试')
      }
    })
  }

  addVolume() {
    this.http.post('volume/add', {name: '未命名卷', pid: this.pid}).subscribe((res) => {
      this.volumes.push(new Volume(res))
    })
  }

  getVolumes() {
    this.volumes = [];
    this.volumeMap.clear();
    return this.client.get(`volume/getVolumes`, {pid: this.pid}).then((res: any) => {
      if (res && res.length) {
        for (const v of res) {
          const volume = new Volume(v);
          this.volumes.push(volume);
          this.volumeMap.set(volume.id, volume);
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

  addChapter(v: Volume) {
    const name = prompt('请输入章节名');
    if (!name) {
      return;
    }
    this.http.post('chapter/add', {pid: this.pid, vid: v.id, name}).subscribe(res => {
      if (res) {
        v.chapters.push(new Chapter(res))
      }
    })
  }

  getChapters() {
    this.http.get(`chapter/getChapters?pid=${this.pid}`).subscribe((res: any) => {
      if (res && res.length) {
        for (const c of res) {
          const chapter = new Chapter(c);
          const volume = this.volumeMap.get(chapter.vid);
          if (volume) {
            volume.chapters.push(chapter);
          }
        }
      }
    })
  }

  selectChapter(c: Chapter) {
    this.selectedChapter = c;
    this.client.get('chapter/getChapter', {id: c.id}).then((res: any) => {
      if (res && res.content) {
        // this.selectedChapter!.content = res.content;
        this.editor.setContent(res.content)
      }
    })
  }

  updateChapterName(c: Chapter) {
    const name = prompt('请输入新的章节名');
    if (!name) {
      return;
    }
    this.client.post('chapter/update', {id: c.id, name}).then(res => {
      if (res) {
        c.name = name;
      }
    })
  }

  deleteChapter(c: Chapter) {
    const res = confirm('您确定要删除该章节吗？')
    if (!res) {
      return
    }
    this.client.post('chapter/delete', {id: c.id}).then(res => {
      if (res) {
        this.ui.success('删除成功')
        const volume = this.volumeMap.get(c.vid);
        volume!.chapters = volume!.chapters.filter(chapter => chapter !== c)
      }
    })
  }

  insert() {
    console.log(this.editor)
    // console.log(this.selectedChapter?.content)
  }

  onEnter() {
    this.editor.commands.insertText('　　').exec();
  }

  manageVolume() {
    this.volumeManaging = !this.volumeManaging;
  }

  manageChapter() {
    this.chapterManaging = !this.chapterManaging;
  }
}
