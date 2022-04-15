export default class Address {
  _id: string;
  _name: string;
  _rua: string


  constructor(id: string, name: string, rua: string) {
    this._id = id;
    this._name = name;
    this._rua = rua;
  }
}
