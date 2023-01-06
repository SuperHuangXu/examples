import { messageStore } from '@/store/message';
import { Button, Input, List } from 'antd';
import { observer } from 'mobx-react-lite';
import Dayjs from 'dayjs';
import { FC, useState } from 'react';
import styles from './index.less';

interface ChatProps {
  sender: string;
}

const Chat: FC<ChatProps> = observer((props) => {
  const [msg, setMsg] = useState('');
  function send() {
    messageStore.send(props.sender, msg);
    setMsg('');
  }

  return (
    <div className={styles.wrap}>
      <div>{props.sender}</div>
      <div className={styles.list}>
        <List
          dataSource={messageStore.message}
          itemLayout="horizontal"
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={item.sender}
                title={Dayjs(item.date).format('MM-DD HH:mm:ss')}
                description={item.msg}
              />
            </List.Item>
          )}
        ></List>
      </div>
      <div className={styles.send}>
        <Input
          placeholder="请输入"
          onChange={(e) => {
            setMsg(e.target.value);
          }}
          value={msg}
        />
        <Button onClick={send}>Send</Button>
      </div>
    </div>
  );
});

export { Chat };
