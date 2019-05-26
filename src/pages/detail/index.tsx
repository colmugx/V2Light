import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { AtNavBar, AtActivityIndicator } from 'taro-ui';
import Wrapper from '../../components/Wrapper';
import Comment from '../../components/Comment';
import ProfileCard from '../../components/ProfileCard';
import VRichText from '../../components/RichText';
import { getStatusHeight, formatTime, timeFormNow } from '../../utils/util';
import Api from '../../services/api';

import './index.scss';

interface IState {
  data: any;
  comments: any[];
  commentLoading: boolean;
}

class DetailPage extends Component<any, IState> {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      comments: [],
      commentLoading: true,
    };
  }

  componentDidMount() {
    const { params } = this.$router;
    this.fetchData(params.id);
  }

  async fetchData(id: number) {
    const data = await Api.getDetail(id);
    this.setState({
      data: data[0],
    });
    this.fetchComments(id);
  }

  async fetchComments(id: number) {
    const data = await Api.getDeitalReply(id);
    this.setState({
      comments: data,
      commentLoading: false,
    });
  }

  back = () => {
    Taro.navigateBack();
  };

  gotoProfile = (id: string) => {
    Taro.navigateTo({
      url: `/pages/member/index?id=${id}`
    })
  }

  render() {
    const { data, comments, commentLoading } = this.state;

    const loadingLayer = (
      <View style={{ height: '300px' }}>
        <AtActivityIndicator mode="center" />
      </View>
    );

    return (
      <View>
        <AtNavBar
          className="navbar"
          title={data.title}
          leftIconType="chevron-left"
          onClickLeftIcon={this.back}
          customStyle={{ paddingTop: `${getStatusHeight()}px` }}
        />
        <Wrapper headerHeight={61}>
          <View className="detail">
            {data.member && (
              <View onClick={() => this.gotoProfile(data.member.id)}>
                <ProfileCard
                  avatar={data.member.avatar_normal}
                  username={data.member.username}
                  message={data.member.url}
                />
              </View>
            )}
            <View className="box article">
              <View className="article-info">
                <View className="article-title">{data.title}</View>
                <View className="article-msg">
                  <Text>{data.node.title}</Text>
                  <Text>{` · `}</Text>
                  <Text>{data.created ? timeFormNow(data.created) : ''}</Text>
                  {/* <Text>点击数</Text> */}
                </View>
              </View>
              <View className="article-content">
                {data.content && (
                  <VRichText className="article-content-rich" nodes={data.content_rendered} />
                )}
              </View>
            </View>
            {commentLoading
              ? loadingLayer
              : !!comments.length && (
                  <View>
                    <View className="box comment-info">
                      <Text>{`${data.replies} `} Replies</Text>
                      <Text>{` | `}</Text>
                      <Text>
                        <Text>Last: </Text>
                        <Text style={{ fontWeight: 'bold' }}>{data.last_reply_by}</Text>
                        <Text>{` at ${formatTime(data.last_modified)}`}</Text>
                      </Text>
                    </View>
                    <View className="box comment-list">
                      {comments.map((item, idx) => (
                        <View key={`comment-${idx}`}>
                          <Comment
                            name={item.member.username}
                            avatar={item.member.avatar_normal}
                            floor={idx + 1}
                            time={item.last_modified}
                            content={item.content_rendered}
                          />
                        </View>
                      ))}
                    </View>
                  </View>
                )}
          </View>
        </Wrapper>
      </View>
    );
  }
}

export default DetailPage;
