import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Note} from "../model/note";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @Input() note: Note;
  @Output() noteUpdated : EventEmitter<Note> = new EventEmitter<Note>();
  @Output() noteDelete : EventEmitter<Note> = new EventEmitter<Note>();

    constructor() { }

  ngOnInit() {
  }

  deleteNote(note: Note) {
    this.noteDelete.emit(this.note);
  }

  updateNote(note: Note) {
   this.noteUpdated.emit(this.note);
  }
}
