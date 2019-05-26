import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtNavBar, AtActivityIndicator } from 'taro-ui';
import ProfileCard from '../../components/ProfileCard';
import Wrapper from '../../components/Wrapper';
import Api from '../../services/api';
import { getStatusHeight } from '../../utils/util';

import './index.scss';

interface IState {
  data: any;
}

class MemberPage extends Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    const { params } = this.$router;
    this.fetchData(params.id);
  }

  async fetchData(id: string) {
    const data = await Api.getProfile({ id });
    this.setState({ data });
  }

  back = () => {
    Taro.navigateBack();
  };

  render() {
    const { data } = this.state;
    return (
      <View>
        <AtNavBar
          className="navbar"
          title={data.username || ''}
          leftIconType="chevron-left"
          onClickLeftIcon={this.back}
          customStyle={{ paddingTop: `${getStatusHeight()}px` }}
        />
        <Wrapper headerHeight={0}>
          <View className="member">
            <ProfileCard avatar={data.avatar_normal} username={data.username} message={data.url} />
          </View>
        </Wrapper>
      </View>
    );
  }
}

export default MemberPage;
