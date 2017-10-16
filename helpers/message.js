var messageCounter = 0

export default class Message {
  constructor(text, sender) {
    this.id = messageCounter
    this.text = text
    this.sender = sender

    messageCounter += 1
  }
}
