import request from '../utils/requests';

class Api {
  /**
   * ## 社区统计信息
   */
  static getSiteStat() {
    return request.get('/site/stats.json', {});
  }

  /**
   * ## 社区介绍
   */
  static getSiteInfo() {
    return request.get('/site/info.json', {})
  }

  /**
   * ## 最热主题
   * 相当于首页右侧的 10 大每天的内容。
   */
  static getHot() {
    return request.get('/topics/hot.json', {});
  }

  /**
   * ## 最新主题
   * 相当于首页的“全部”这个 tab 下的最新内容。
   */
  static getNewTopic() {
    return request.get('/topics/latest.json', {});
  }

  /**
   * ## 主题详情
   * @param {number} id ID
   */
  static getDetail(id: number) {
    return request.get('/topics/show.json', {
      id
    })
  }

  /**
   * ## 主题回复
   * @param {number} id Topic ID
   */
  static getDeitalReply(id: number) {
    return request.get('/replies/show.json', {
      topic_id: id
    })
  }

  /**
   * ## 用户信息
   * @param {number} id ID
   * @param {string} username 用户名
   */
  static getMember(id?: number, username?: string) {
    return request.get('/members/show.json', {
      id,
      username
    })
  }

  /**
   * ## 节点信息
   * 获得指定节点的名字，简介，URL 及头像图片的地址。
   * @param {string|number} name 节点名
   */
  static getNodeMsg(name: string | number) {
    return request.get('/nodes/show.json', {
      name,
    });
  }

  /**
   * ## 获取所有节点
   */
  static getNodes() {
    return request.get('/nodes/all.json', {})
  }

  /**
   * ## 用户主页
   * 获得指定用户的自我介绍，及其登记的社交网站信息。
   *
   * @param {string} username 用户名
   * @param {number} id ID
   */
  static getProfile(username: string, id: number) {
    return request.get('/members/show.json', {
      username,
      id,
    });
  }
}

export default Api;
