import Taro, { Component, Config, setStorage } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtTabs, AtTabsPane, AtActivityIndicator } from 'taro-ui';
import { connect } from '@tarojs/redux';
import Api from '../../services/api';
import Wrapper from '../../components/Wrapper';
import Thread from '../../components/Thread';
import VHeader from '../../components/Header';

import './index.scss';

const TAB_LIST = [{ title: '最热' }, { title: '最新' }];

interface IProps {}

interface IState {
  current: number;
  hotList: any[];
  newList: any[];
  loading: boolean;
}

interface IndexPage {
  props: IProps;
  state: IState;
}

class IndexPage extends Component {
  config: Config = {
    enablePullDownRefresh: true,
    backgroundTextStyle: 'dark',
  };

  constructor(props: IProps) {
    super(props);
    this.state = {
      current: 0,
      hotList: [],
      newList: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchInit();
  }

  onPullDownRefresh() {
    this.fetchList();
  }

  async fetchInit() {
    const apiList = [Api.getHot, Api.getNewTopic];
    const hotList = await apiList[0]();
    const newList = await apiList[1]();
    this.setState({ hotList, newList, loading: false });
  }

  async fetchList() {
    const apiList = [Api.getHot, Api.getNewTopic];
    const signs = ['hotList', 'newList'];
    const { current } = this.state;
    const dataList = await apiList[current]();
    this.setState({ [signs[current]]: dataList });
  }

  handleTab = id => {
    this.setState({ current: id });
  };

  handlePush = id => {
    Taro.navigateTo({
      url: `/pages/detail/index?id=${id}`,
    });
  };

  render() {
    const { hotList, newList, loading } = this.state;

    const loadingLayer = (
      <View style={{ height: '300px' }}>
        <AtActivityIndicator mode="center" />
      </View>
    );

    return (
      <View>
        <VHeader index={0} />
        <Wrapper headerHeight={56}>
          <View className="index">
            <AtTabs tabList={TAB_LIST} current={this.state.current} onClick={this.handleTab}>
              <AtTabsPane current={this.state.current} index={0}>
                {loading
                  ? loadingLayer
                  : hotList.map(item => (
                      <View className="thread" key={`thred-${item.id}`}>
                        <Thread
                          title={item.title}
                          author={item.member.username}
                          avatar={item.member.avatar_mini}
                          node={item.node.title}
                          content={item.content}
                          lastModify={item.last_modified}
                          replies={item.replies}
                          onClick={() => this.handlePush(item.id)}
                        />
                      </View>
                    ))}
              </AtTabsPane>
              <AtTabsPane current={this.state.current} index={1}>
                {newList.map(item => (
                  <View className="thread" key={`thred-${item.id}`}>
                    <Thread
                      key={`thred-${item.id}`}
                      title={item.title}
                      author={item.member.username}
                      avatar={item.member.avatar_mini}
                      node={item.node.title}
                      content={item.content}
                      lastModify={item.created}
                      replies={item.replies}
                      onClick={() => this.handlePush(item.id)}
                    />
                  </View>
                ))}
              </AtTabsPane>
            </AtTabs>
          </View>
        </Wrapper>
      </View>
    );
  }
}

export default IndexPage;
