import EventInterface from "../@shared/event.interface";

export default class ProductCreatedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;


  constructor(dataTimeOccurred: Date, eventData: any) {
    this.dataTimeOccurred = dataTimeOccurred;
    this.eventData = eventData;
  }
}
