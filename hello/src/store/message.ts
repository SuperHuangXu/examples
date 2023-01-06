import { makeAutoObservable } from 'mobx';
import { v4 as uuid } from 'uuid';

interface MessageItem {
  uid: string;
  date: number;
  sender: string;
  msg: string;
}

function createMessage() {
  return makeAutoObservable({
    message: [] as MessageItem[],

    send(sender: string, msg: string) {
      this.message = this.message.concat({
        uid: uuid(),
        date: Date.now(),
        sender,
        msg,
      });
    },
  });
}

const messageStore = createMessage();

export { messageStore };
