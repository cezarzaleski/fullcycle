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
    this.validate()
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

  validate() {
    if (this._street.length === 0) {
      throw new Error("Street is required");
    }
    if (this._number === 0) {
      throw new Error("Number is required");
    }
    if (this._zip.length === 0) {
      throw new Error("Zip is required");
    }
    if (this._city.length === 0) {
      throw new Error("City is required");
    }
  }
}
