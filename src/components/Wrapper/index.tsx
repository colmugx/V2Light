import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { getStatusHeight } from '../../utils/util';

interface IProps {
  headerHeight: number;
}

class Wrapper extends Component<IProps> {
  render() {
    const { headerHeight } = this.props;
    return (
      <View style={{ marginTop: `${getStatusHeight() + headerHeight}px`, marginBottom: '16px' }}>
        {this.props.children}
      </View>
    );
  }
}

export default Wrapper;
