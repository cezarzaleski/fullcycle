import EventDispatcher from "./event-dispatcher";
import SendConsoleLog1Handler from "../../customer/event/handler/send-console-log1.handler";
import SendConsoleLog2Handler from "../../customer/event/handler/send-console-log2.handler";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import SendConsoleLogHandler from "../../customer/event/handler/send-console-log.handler";
import ChangedCustomerAddressEvent from "../../customer/event/changed-customer-address.event";

describe("Domain events customer test", () => {
  it("should register events handler from creating customer", () => {
    const eventDispacther = new EventDispatcher()
    const sendConsoleLog1Handler = new SendConsoleLog1Handler()
    const sendConsoleLog2Handler = new SendConsoleLog2Handler()

    eventDispacther.register("CustomerCreatedEvent", sendConsoleLog1Handler)
    eventDispacther.register("CustomerCreatedEvent", sendConsoleLog2Handler)

    expect(
      eventDispacther.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined()
    expect(eventDispacther.getEventHandlers["CustomerCreatedEvent"].length
    ).toBe(2)
    expect(eventDispacther.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(sendConsoleLog1Handler)
    expect(eventDispacther.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(sendConsoleLog2Handler)
  })

  it("should notify all events handlers from creating customer", () => {
    const eventDispacther = new EventDispatcher()
    const sendConsoleLog1Handler = new SendConsoleLog1Handler()
    const sendConsoleLog2Handler = new SendConsoleLog2Handler()
    const spySendConsole1Log1Handler = jest.spyOn(sendConsoleLog1Handler, "handle")
    const spySendConsole2Log1Handler = jest.spyOn(sendConsoleLog2Handler, "handle")

    eventDispacther.register("CustomerCreatedEvent", sendConsoleLog1Handler)
    eventDispacther.register("CustomerCreatedEvent", sendConsoleLog2Handler)
    expect(eventDispacther.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(sendConsoleLog1Handler)
    expect(eventDispacther.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(sendConsoleLog2Handler)

    const customerCreatedEvent = new CustomerCreatedEvent(new Date(), {
      name: 'Customer 1',
      address: 'address',
      rewardPoints: '5',
      active: true
    })
    eventDispacther.notify(customerCreatedEvent)

    expect(spySendConsole1Log1Handler).toHaveBeenCalled()
    expect(spySendConsole2Log1Handler).toHaveBeenCalled()

  })

  it("should register events handler from changed customer address", () => {
    const eventDispacther = new EventDispatcher()
    const sendConsoleLogHandler = new SendConsoleLogHandler()

    eventDispacther.register("ChangedCustomerAddressEvent", sendConsoleLogHandler)

    expect(
      eventDispacther.getEventHandlers["ChangedCustomerAddressEvent"]
    ).toBeDefined()
    expect(eventDispacther.getEventHandlers["ChangedCustomerAddressEvent"].length
    ).toBe(1)
    expect(eventDispacther.getEventHandlers["ChangedCustomerAddressEvent"][0]
    ).toMatchObject(sendConsoleLogHandler)
  })

  it("should notify all events handlers from creating customer", () => {
    const eventDispacther = new EventDispatcher()
    const sendConsoleLogHandler = new SendConsoleLogHandler()
    const spySendConsoleLogHandler = jest.spyOn(sendConsoleLogHandler, "handle")

    eventDispacther.register("ChangedCustomerAddressEvent", sendConsoleLogHandler)
    expect(eventDispacther.getEventHandlers["ChangedCustomerAddressEvent"][0]
    ).toMatchObject(sendConsoleLogHandler)

    const customerCreatedEvent = new ChangedCustomerAddressEvent(new Date(), {
      id: 'c1',
      name: 'Customer 1',
      address: 'address',
      rewardPoints: '5',
      active: true
    })
    eventDispacther.notify(customerCreatedEvent)

    expect(spySendConsoleLogHandler).toHaveBeenCalled()

  })
})
