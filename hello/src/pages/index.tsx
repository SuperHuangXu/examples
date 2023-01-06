import { observer } from 'mobx-react-lite';
import { Chat } from '@/component/Chat';
import styles from './index.less';

function IndexPage() {
  return (
    <div className={styles.wrap}>
      <Chat sender={'A'} />
      <Chat sender={'B'} />
    </div>
  );
}

export default observer(IndexPage);
