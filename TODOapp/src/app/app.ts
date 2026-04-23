import { Component, signal, OnInit } from '@angular/core';
import { Tarefa } from "./tarefa";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App 
{
    protected readonly title = signal('TODOapp');

    arrayDeTarefas = signal<Tarefa[]>([]);
    apiURL : string;

    constructor(private http: HttpClient) 
    { 
      this.apiURL = 'https://apitarefasjoao254381.onrender.com';
    }

    CREATE_tarefa(descricaoNovaTarefa: string) 
    {
      var novaTarefa = new Tarefa(descricaoNovaTarefa, false);
      this.http.post<Tarefa>(`${this.apiURL}/api/post`, novaTarefa).subscribe(
      resultado => { console.log(resultado); this.READ_tarefas(); });
    }

    ngOnInit() {this.READ_tarefas();}
    READ_tarefas() 
    {
      this.http.get<Tarefa[]>(`${this.apiURL}/api/getAll`).subscribe(
        resultado => this.arrayDeTarefas.set(resultado)); 
    }

    UPDATE_tarefa(tarefaAserModificada: Tarefa) 
    { 
      var indice = this.arrayDeTarefas().indexOf(tarefaAserModificada);
      var id = this.arrayDeTarefas()[indice]._id;
      this.http.patch<Tarefa>(`${this.apiURL}/api/update/${id}`,
      tarefaAserModificada).subscribe(
      resultado => { console.log(resultado); this.READ_tarefas(); });
    }

    DELETE_tarefa(tarefaAserRemovida: Tarefa) 
    { var indice = this.arrayDeTarefas().indexOf(tarefaAserRemovida); 
      var id = this.arrayDeTarefas()[indice]._id;
      this.http.delete<Tarefa>(`${this.apiURL}/api/delete/${id}`).subscribe(
        resultado => { console.log(resultado); this.READ_tarefas(); });
    }

}












