import EventInterface from "../../@shared/event/event.interface";


export default class ProductCreatedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;


  constructor(dataTimeOccurred: Date = new Date(), eventData: any) {
    this.dataTimeOccurred = dataTimeOccurred;
    this.eventData = eventData;
  }
}
