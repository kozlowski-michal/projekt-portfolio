//*************************************************************************************************//
// Serwis odpowiedzialny za komunikację z bazą danych
// Baza danych to Firebase od googla
// Przechowywane są tam rekordy dla tekstu o firmie, tekstu kontaktu oraz dane projektów
//*************************************************************************************************//
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference  } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Project, Text } from '../shared/models';

@Injectable({ providedIn: 'root' })
export class DbService {

  private projectsCollection: AngularFirestoreCollection<Project>;
  projects: Observable<Project[]>;

  private aboutText: AngularFirestoreDocument<Text>;
  private contactText: AngularFirestoreDocument<Text>; 

  constructor( private afs: AngularFirestore ){
    this.projectsCollection = afs.collection<Project>('projects');
    this.projects = this.getProjectsSnapshot();
    this.aboutText = afs.doc<Text>("texts/about"); 
    this.contactText = afs.doc<Text>("texts/contact");    
  }

  // część obsługująca projekty
  getProjectsSnapshot(): Observable<Project[]>{
    return this.projectsCollection.snapshotChanges().pipe(
      map( actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Project;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  getProjects(): Observable<Project[]> {
    this.projects = this.getProjectsSnapshot();
    return this.projects;
  }

  addProject(project: Project): Promise<DocumentReference>{
    return this.projectsCollection.add(project);
  }

  updateProject(id: string, data: Partial<Project>): Promise<void>{   
    return this.projectsCollection.doc(id).update(data);
  }

  deleteProject(id: string): Promise<void>{
    return this.projectsCollection.doc(id).delete();
  }

  getProjectById(id: string){
    return this.projectsCollection.doc(id).get();
  }

  getProjectByLink(link: string){
    return this.afs.collection<Project>('projects', ref => ref.where('link', '==', link)).snapshotChanges().pipe(
      map( actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Project;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  // część obsługująca stornę o firmie i kontaktu
  getAbout(){
    return this.aboutText.get();
  }

  getContact(){
    return this.contactText.get();
  }

  updateAbout(text: Text){
    return this.aboutText.update(text);
  }

  updateContact(text: Text){
    return this.contactText.update(text);
  }
}



