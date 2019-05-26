import Taro, { Component, Config } from '@tarojs/taro';
import { BaseEventOrig } from '@tarojs/components/types/common';
import { View, Text } from '@tarojs/components';
import { AtList, AtListItem } from 'taro-ui';
import Wrapper from '../../components/Wrapper';
import VHeader from '../../components/Header';

import '../../styles/base.scss';
import './index.scss';

class NodesPage extends Component {
  config: Config = {
    navigationBarTitleText: '关于',
  };

  componentDidMount() {}

  handleChange = (e: BaseEventOrig<any>) => {
    console.log(e);
  };

  render() {
    const logo = (
      <View className="logo">
        <Text>V2Light</Text>
      </View>
    );

    const setting = (
      <AtList>
        <AtListItem
          title="夜间模式"
          isSwitch
          hasBorder={false}
          disabled
          onSwitchChange={this.handleChange}
        />
      </AtList>
    );

    return (
      <View className="about">
        <VHeader index={1} />
        <Wrapper headerHeight={86}>
          <View>{logo}</View>
          <View>{setting}</View>
        </Wrapper>
      </View>
    );
  }
}
export default NodesPage;
