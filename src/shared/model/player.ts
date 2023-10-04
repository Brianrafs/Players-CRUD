export class Player {
  constructor(private _nome: string,
              private _nick: string,
              private _idade: number,
              private _lane: string) {
  }

  get nome(): string{
    return this._nome
  }
  set nome(value:string  ){
    this._nome = value;
  }

  get nick(): string{
    return this._nick
  }

  set nick(value: string){
    this._nick = value;
  }

  get idade(): number{
    return this._idade
  }

  set idade(value: number){
    this._idade = value;
  }

  get lane(){
    return this._lane
  }

  set lane(value: string){
    this._lane = value;
  }
}
