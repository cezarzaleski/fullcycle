FROM golang:alpine as builder

WORKDIR /usr/go/src/app

COPY . .

RUN CGO_ENABLED=0 go build -o /app hello-world.go

FROM scratch

COPY --from=builder /app /app

CMD [ "/app" ]