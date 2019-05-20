import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { getStatusHeight } from '../../utils/util';

import './index.scss'

const PAGES_LIST = [
  {
    text: '首页',
    pagePath: '/pages/index/index',
  },
  {
    text: '节点',
    pagePath: '/pages/nodes/index',
  },
  {
    text: '关于',
    pagePath: '/pages/about/index',
  },
];

interface IProps {
  index: number
}

interface IState {
  current: number;
}

class Header extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      current: this.props.index,
    };
  }

  componentDidMount() {}

  switchTab = id => {
    Taro.switchTab({
      url: PAGES_LIST[id].pagePath,
    });
  };

  render() {
    const { current } = this.state
    return (
      <View
        className="header"
        style={{
          paddingTop: `${getStatusHeight() + 8}px`,
        }}
      >
        <View className="app-name">V2LIGHT</View>
        <View className="navigation">
          {PAGES_LIST.map((item, idx) => (
            <View
              key={`nav-item-${item.text}`}
              onClick={() => this.switchTab(idx)}
              className={[
                "navigation-item",
                idx === current && "active"
              ].join(' ')}
            >
              {item.text}
            </View>
          ))}
        </View>
      </View>
    );
  }
}

export default Header;
