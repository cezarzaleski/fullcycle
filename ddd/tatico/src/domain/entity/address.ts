export default class Address {
  private readonly _number: number;
  private readonly _street: string;
  private readonly _city: string;
  private readonly _zip: string


  constructor(number: number, street: string, city: string, zip: string) {
    this._number = number;
    this._street = street;
    this._city = city;
    this._zip = zip;
  }

  get number(): number {
    return this._number;
  }

  get street(): string {
    return this._street;
  }

  get city(): string {
    return this._city;
  }

  get zip(): string {
    return this._zip;
  }
}
