import { Component } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Player} from "../shared/model/player";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Player-CRUD';
  protected readonly nameFormControl = nameFormControl;
  protected readonly nickFormControl = nickFormControl;
  protected readonly ageFormControl = ageFormControl;
  playerTratamento
  players: Player[] =[];
  mensagemErro = '';
  lane:string =''
  jogadorOriginal: Player = new Player('', '', 0, '')
  modoEdicao: boolean = false;

  constructor() {
    this.playerTratamento = new Player('','',0,'');
  }

  trackByPlayer(index: number, player: Player): string {
    return player.nick; // Use uma propriedade única do jogador como identificador
  }

  cadastrar(): void {
    if (!this.ehNickCadastrado(this.playerTratamento.nick)) {
      const novoPlayer = new Player(
          this.playerTratamento.nome,
          this.playerTratamento.nick,
          this.playerTratamento.idade,
          this.lane
      );
      this.players.push(novoPlayer);
      this.playerTratamento.lane = this.lane;
      this.mensagemErro = '';
    } else {
      this.mensagemErro = `Nickname ${this.playerTratamento.nick} já cadastrado!`;
    }
  }

  remover(playerARemover: Player): void {
    const indxARemover = this.players.findIndex(player =>
      player.nick === playerARemover.nick);

    if (indxARemover >= 0) {
      this.players.splice(indxARemover, 1);
    }

  }
  onLangeChange($event:any) {
    this.lane = $event.value;
  }
  private ehNickCadastrado(nick: string): boolean {
    const playersRetornados = this.players.filter(player => player.nick === nick);
    return playersRetornados.length > 0;
  }

  ativarEdicao() {
    this.modoEdicao = true;
    this.jogadorOriginal.nome = this.playerTratamento.nome;
    this.jogadorOriginal.nick = this.playerTratamento.nick;
    this.jogadorOriginal.idade = this.playerTratamento.idade;
    this.jogadorOriginal.lane = this.playerTratamento.lane;
  }

  salvarEdicao() {
    this.modoEdicao = false;
    console.log(this.players)
    this.playerTratamento.lane = this.lane;
    const index = this.players.findIndex((player) => player.nick === this.playerTratamento.nick);

    if (index == -1) {
      const jogadorAtualizado = {
        nome: this.playerTratamento.nome,
        nick: this.playerTratamento.nick,
        idade: this.playerTratamento.idade,
        lane: this.playerTratamento.lane,
      };
      this.players[index] = jogadorAtualizado as Player;
    }

  }

  cancelarEdicao() {
    this.modoEdicao = false;
    this.playerTratamento.nome = this.jogadorOriginal.nome;
    this.playerTratamento.nick = this.jogadorOriginal.nick;
    this.playerTratamento.idade = this.jogadorOriginal.idade;
    this.playerTratamento.lane = this.jogadorOriginal.lane;
  }
}


export let nameFormControl = new FormControl('', [Validators.required]);
export let nickFormControl = new FormControl('', [Validators.required]);
export let ageFormControl = new FormControl('', [Validators.required]);
