import Taro, { Component, Config } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { AtActivityIndicator } from 'taro-ui';
import Wrapper from '../../components/Wrapper';
import VHeader from '../../components/Header';
import Api from '../../services/api';

import './index.scss';

interface IState {
  nodes: any[];
  loading: boolean
}

class NodesPage extends Component<any, IState> {
  config: Config = {
    navigationBarTitleText: '节点',
  };

  constructor (props: any) {
    super(props)
    this.state = {
      nodes: [],
      loading: true
    }
  }


  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    let data = Taro.getStorageSync('nodes');
    if (!data) {
      const fetchData: any[] = await Api.getNodes();
      data = fetchData.reduce((con, item) => {
        const parent = item.parent_node_name
        const data = con.hasOwnProperty(parent) ? con[parent].concat(item) : [item]

        return {
          ...con,
          [parent]: data
        }
      }, {})
    }

    this.setState({
      nodes: data,
      loading: false
    });
  }

  render() {
    const { nodes } = this.state
    return (
      <View className="nodes">
        <VHeader index={1} />
        <Wrapper headerHeight={70}>hello</Wrapper>
      </View>
    );
  }
}
export default NodesPage;
