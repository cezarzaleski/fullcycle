import EventDispatcher from "./event-dispatcher";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";

describe("Domain events test", () => {
  it("should register an event handler", () => {
    const eventDispacther = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()

    eventDispacther.register("ProductCreateEvent", eventHandler)

    expect(
      eventDispacther.getEventHandlers["ProductCreateEvent"]
    ).toBeDefined()
    expect(eventDispacther.getEventHandlers["ProductCreateEvent"].length
    ).toBe(1)
    expect(eventDispacther.getEventHandlers["ProductCreateEvent"][0]
    ).toMatchObject(eventHandler)
  })

  it("should unregister an event handler", () => {
    const eventDispacther = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()

    eventDispacther.register("ProductCreateEvent", eventHandler)
    expect(eventDispacther.getEventHandlers["ProductCreateEvent"][0]
    ).toMatchObject(eventHandler)

    eventDispacther.unregister("ProductCreateEvent", eventHandler)

    expect(
      eventDispacther.getEventHandlers["ProductCreateEvent"]
    ).toBeDefined()
    expect(eventDispacther.getEventHandlers["ProductCreateEvent"].length
    ).toBe(0)
  })

  it("should unregister all event handler", () => {
    const eventDispacther = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()

    eventDispacther.register("ProductCreateEvent", eventHandler)
    expect(eventDispacther.getEventHandlers["ProductCreateEvent"][0]
    ).toMatchObject(eventHandler)

    eventDispacther.unregisterAll()

    expect(
      eventDispacther.getEventHandlers["ProductCreateEvent"]
    ).toBeUndefined()
  })
})
