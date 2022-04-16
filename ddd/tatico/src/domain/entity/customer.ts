import Address from './address';

export default class Customer {
  private _id: string;
  private _name: string;
  private _address?: Address;
  private _rewardPoints = 0;
  private _active: boolean = false;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate()
  }

  set address(value: Address) {
    this._address = value;
  }

  get id(): string {
    return this._id;
  }

  get isActive(): boolean {
    return this._active;
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
  }

  changeName(name: string) {
    this._name = name
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points
  }

  deactivate() {
    this._active = false
  }
}

// os dados precisam estar consistentes
// entidade focada em negócio e entidade focada em banco de dados
