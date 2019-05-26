import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import VRichText from '../../components/RichText';
import { timeFormNow } from '../../utils/util';

import './index.scss';

interface IProps {
  name: string;
  avatar: string;
  time: string;
  floor: string | number;
  content: string;
}

class Comment extends Component<IProps> {
  render() {
    const { name, avatar, time, floor, content } = this.props;
    return (
      <View className="comment">
        <View className="left">{avatar ? <Image src={`https:${avatar}`} /> : <View />}</View>
        <View className="right">
          <View className="comment-body">
            <View className="name">{`${name}:`}</View>
            <VRichText className="comment-content" nodes={content} />
          </View>
          <View className="other">{`#${floor} · ${timeFormNow(time)}`}</View>
        </View>
      </View>
    );
  }
}

export default Comment;
