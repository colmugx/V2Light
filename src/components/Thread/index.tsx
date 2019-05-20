import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { timeFormNow } from '../../utils/util';
import './index.scss';

interface IProps {
  title: string;
  author: string;
  avatar: string;
  node: string;
  content: string;
  lastModify: number;
  replies: number;
  onClick?: () => void;
}

class Thread extends Component<IProps> {
  render() {
    const { onClick, title, author, avatar, node, content, lastModify, replies } = this.props;
    return (
      <View className="thread" onClick={onClick}>
        <View className="time">{`${timeFormNow(lastModify)} · ${node}`}</View>
        <View className="title">{title}</View>
        <View className="description">{content}</View>
        <View className="others">
          <View className="author">
            {avatar ? <Image src={`https:${avatar}`} /> : <View />}
            <Text>{author}</Text>
          </View>
          <View className="counter">{replies}</View>
        </View>
      </View>
    );
  }
}

export default Thread;
