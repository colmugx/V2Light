import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import './index.scss';

interface IProps {
  avatar: string;
  username: string;
  message: string;
}
class ProfileCard extends Component<IProps> {
  render() {
    const { avatar, username, message } = this.props;
    return (
      <View className="profile">
        <View className="left">
          <Image className="avatar" src={avatar ? `https:${avatar}` : ''} />
        </View>
        <View className="right">
          <Text className="author-name">{username}</Text>
          <Text className="author-other">{message}</Text>
        </View>
      </View>
    );
  }
}

export default ProfileCard;
