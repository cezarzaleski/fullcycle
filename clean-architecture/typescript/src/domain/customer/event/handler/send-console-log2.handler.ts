import CustomerCreatedEvent from "../customer-created.event";

interface EventInterface {
}

interface EventHandlerInterface<T> {
}

export default class SendConsoleLog2Handler implements EventHandlerInterface<CustomerCreatedEvent> {
  handle(event: EventInterface): void {
    console.log(`Esse é o segundo console.log do evento: CustomerCreated`)
  }
}
