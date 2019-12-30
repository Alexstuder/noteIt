import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Notebook} from "./model/notebook";
import {ApiService} from "../shared/api.service";
import {Note} from "./model/note";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notebooks: Notebook[] = [];
  notes : Note[] = [] ;
  selectedNotebook: Notebook;


  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getAllNotebooks();
    this.getAllNotes();
  }


  public getAllNotebooks(){
    this.apiService.getAllNotebooks().subscribe(

      res =>{
        this.notebooks = res;
      },
      error => {
        alert("An error has occurred while trying to get all Notebooks from server")
      }
    );
  }

  getAllNotes(){
    this.apiService.getAllNotes().subscribe(
      value => {
        this.notes = value;

      },
      error => {
        alert("An error occurred while download notes !")
      }
    );
  }
  createNotebook() {
    let newNotebook: Notebook = {
      name:'New notebook',
      id:null,
      nbOfNotes: 0
    };
    this.apiService.postNotebook(newNotebook).subscribe(
      value =>  {
        // Die vom Server zurückerhaltene ID in das neue Notebook einpflegen.
        newNotebook.id = value.id;
        // DAs neue Notebook in die Liste der Notebooks pushen
        this.notebooks.push(newNotebook);

      },
      error => {
        alert("An error has occurred while saving a new Notebook ")
      }

    );

  }

  updateNotebook(updatedNotebook: Notebook) {
    this.apiService.postNotebook(updatedNotebook).subscribe(
      value =>  {
        // Nichts zu tun hier !
      },
      error => {
        alert("An error has occurred while changing the Notebook ")
      }

    );

  }

  deleteNotebook(deleteNotebook: Notebook) {
    if(confirm("Are you shure you want to delete Notebook ?")){
      this.apiService.deleteNotebooks(deleteNotebook.id).subscribe(
        value => {
          let indexOfNotebook = this.notebooks.indexOf(deleteNotebook);
          this.notebooks.splice(indexOfNotebook,1);
        },
        error => {
          alert("Could not delete the Notebook !");
        }
      );

    }
  }

  deleteNote(note: Note) {
    if(confirm("Do you really want to delete the note ?")){

      this.apiService.deleteNote(note.id).subscribe(
        value => {
          let indexOfNotes = this.notes.indexOf(note);
          this.notes.splice(indexOfNotes,1);
        },
        error => {
          alert("An error occurred while deleting a note !")
        }
      );
    }
  }

  createNote(notebookId: string) {
    let newNote:Note = {
      id:null,
      title: "New Note",
      text: "Write some text here !",
      lastModifiedOn: null,
      notebookId: notebookId
    };

    this.apiService.saveNote(newNote).subscribe(
      value => {
        newNote.id =value.id;
        this.notes.push(newNote);
      },
      error => {
        alert("An error occurred while saving the note ¨!")
      },
    );

  }

  selectNotebook(notebook: Notebook) {
    this.selectedNotebook = notebook;
    this.apiService.getAllNotesByNotebook(notebook.id).subscribe(
      value => {
        this.notes = value;
      },
      error => {
        alert("An error occurred while trying to get the notes from the server !")
      }
    );

  }

  updateNotes(note: Note) {

    this.apiService.saveNote(note).subscribe(
      value => {
        // nothing to do here !
      },
      error => {
        alert("An error occurred while updating the note ¨!")
      },
    );

  }

  selectAllNotes() {
    this.selectedNotebook = null;
    this.getAllNotes();

  }
}
