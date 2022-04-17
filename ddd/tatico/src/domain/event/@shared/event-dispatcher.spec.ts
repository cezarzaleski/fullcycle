import EventDispatcher from "./event-dispatcher";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";

describe("Domain events test", () => {
  it("should register an event handler", () => {
    const eventDispacther = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()

    eventDispacther.register("ProductCreatedEvent", eventHandler)

    expect(
      eventDispacther.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined()
    expect(eventDispacther.getEventHandlers["ProductCreatedEvent"].length
    ).toBe(1)
    expect(eventDispacther.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler)
  })

  it("should unregister an event handler", () => {
    const eventDispacther = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()

    eventDispacther.register("ProductCreatedEvent", eventHandler)
    expect(eventDispacther.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler)

    eventDispacther.unregister("ProductCreatedEvent", eventHandler)

    expect(
      eventDispacther.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined()
    expect(eventDispacther.getEventHandlers["ProductCreatedEvent"].length
    ).toBe(0)
  })

  it("should unregister all event handler", () => {
    const eventDispacther = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()

    eventDispacther.register("ProductCreatedEvent", eventHandler)
    expect(eventDispacther.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler)

    eventDispacther.unregisterAll()

    expect(
      eventDispacther.getEventHandlers["ProductCreatedEvent"]
    ).toBeUndefined()
  })

  it("should notify all event handlers", () => {
    const eventDispacther = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()
    const spyEventHandler = jest.spyOn(eventHandler, "handle")

    eventDispacther.register("ProductCreatedEvent", eventHandler)
    expect(eventDispacther.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler)

    const productCreatedEvent = new ProductCreatedEvent(new Date(), {
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0,
    })
    eventDispacther.notify(productCreatedEvent)

    expect(spyEventHandler).toHaveBeenCalled()

  })
})
