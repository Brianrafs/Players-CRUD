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
  playersPesquisa: Array<Player> = [];
  mensagemErro = '';

  constructor() {
    this.playerTratamento = new Player('','',0,'');
  }

  cadastrar(): void {
    if (!this.ehNickCadastrado(this.playerTratamento.nick)) {
      this.players.push(this.playerTratamento);
      this.playerTratamento = new Player('', '', 0, '');
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

  private ehNickCadastrado(nick: string): boolean {
    const playersRetornados = this.players.filter(player => player.nick === nick);
    return playersRetornados.length > 0;
  }

  pesquisar(pedacoNick: string) {
    if (pedacoNick.length == 0) {
      this.playersPesquisa = [];
    }
    this.players.forEach(player => {
      if (player.nome.startsWith(pedacoNick)) {
        this.playersPesquisa.push(player);
      }
    });
  }

}


export let nameFormControl = new FormControl('', [Validators.required]);
export let nickFormControl = new FormControl('', [Validators.required]);
export let ageFormControl = new FormControl('', [Validators.required]);
