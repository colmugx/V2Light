import Taro, { PureComponent } from '@tarojs/taro';
import { View } from '@tarojs/components';
import WxParse from '../wxParse/wxParse';
import './index.scss';
import '../wxParse/wxParse.wxss';

interface IProps {
  nodes: string;
  className: string;
}

class RichText extends PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
    const { nodes } = this.props;
    WxParse.wxParse('article', 'html', nodes, this.$scope, 5);
  }

  render() {
    const { className } = this.props;
    return (
      <View className={[className, 'body'].join(' ')}>
        <import src="../wxParse/wxParse.wxml" />
        <template is="wxParse" data="{{wxParseData:article.nodes}}" />
      </View>
    );
  }
}

export default RichText;
