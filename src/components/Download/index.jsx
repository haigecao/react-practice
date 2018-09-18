/* eslint-disable global-require,no-script-url,jsx-a11y/anchor-is-valid */
/**
 * usage:
 * <Download wording="xxx" fixed={false} />
 * wording: 文案 default ""
 * fixed: 是否固定定位到顶部 default false
 * autodetect: 自动检测 app 外才显示，default true；若希望一直显示，设置为 true
 */

import React, { Component } from 'react';
import {
  isAppInstalled,
  isFudaoApp,
  versionfunegt,
  isWeixin,
  isMQQ,
  clickLock,
  openAppPage,
  openUrlByIframe,
  getParams,
} from '@tencent/imutils';
import Img from 'components/Img';
import cx from 'classnames';
import './index.scss';

const APP_INSTALLED = 'APP_INSTALLED';
const APP_NOT_INSTALLED = 'APP_NOT_INSTALLED';

const mqq = typeof window !== 'undefined' ? window.mqq || {} : {};
const isiOS = !!mqq.iOS;
const isInFudao = typeof window !== 'undefined' && isFudaoApp();

const IOS_APP_STORE = 'https://itunes.apple.com/app/id1111173695';
function getWXVersion() {
  const ua = navigator.userAgent.toLowerCase();
  return (ua.match(/micromessenger\/(\d+\.\d+\.\d+)(\.\d+)?/i) || [])[1];
}

/* function tryLaunchFudaoApp(onfail) {
  const wxVersion = getWXVersion();
  if (versionfunegt(wxVersion, '6.5.6')) {
    weiXinApply(() => {
      window.WeixinJSBridge && window.WeixinJSBridge.invoke('launchApplication', {
        schemeUrl: 'tencentk12://',
      }, (res) => {
        // launchApplication:ok or launchApplication:fail
        if (res.err_msg.match(/ok/ig)) { // 成功
          // do nothing
        } else {
          onfail();
        }
      });
    });
  } else {
    onfail();
  }
} */

class Download extends Component {
  constructor(props) {
    super(props);
    this.state = {
      APP_STATUS: APP_NOT_INSTALLED,
    };
  }
  componentDidMount() {
    isAppInstalled((hasInstalled) => {
      this.setState({ APP_STATUS: hasInstalled ? APP_INSTALLED : APP_NOT_INSTALLED });
    });
  }
  onClick = () => {
    const { isShowBtn } = this.props;

    if (isShowBtn === false) {
      return;
    }

    clickLock(() => {
      if (this.props.onClick) {
        this.props.onClick();
      }
      // 这两个平台能判断 APP 安装状态
      if (isWeixin || isMQQ()) {
        let versionChecked = true;
        if (isWeixin) {
          const wxVersion = getWXVersion();
          versionChecked = versionfunegt(wxVersion, '6.5.6');
        }
        // iOS 小于 6.5.6 不能判断 APP 是否安装、不能呼起 APP
        if (versionChecked) {
          if (this.state.APP_STATUS === APP_INSTALLED) {
            this.callApp();
          } else if (isWeixin && isiOS) {
            // 但是在 iOS 上面判断不准，需要尝试打开，打开不成功有个 callback，然后才下载 APP
            const onfail = () => {
              this.downLoad();
            };
            this.callApp(onfail);
          } else {
            this.downLoad();
          }
        } else {
          this.downLoad();
        }
      } else {
        // 其它环境下，比如普通浏览器中，不论是否安装 APP，都是
        // 1. 尝试呼起 APP
        // 2. 尝试下载: android 根据渠道包下载；iOS 呼起应用市场
        this.callApp();
        const delay = isiOS ? 2000 : 100;
        setTimeout(() => {
          this.downLoad();
        }, delay);
      }
    });
  };

  callApp(onfail) {
    /*
    a. 课程详情页：打开app内具体的课程详情页，点击返回，到首页。
    b. 官网页面：打开app首页
    c. 课间文章页面：打开app内具体的文章详情页，点击返回，到首页
    d.老师详情页：打开具体的老师主页，点击返回，回到首页
    */

    let { pathname, href } = window.location;
    let act = 'homepage';
    let params = {};

    if (/\/(course|course_break_article|teacher)\.html$/.test(pathname)) {
      act = 'webview';
      if (!/pageMapping/.test(href)) {
        if (!/\?/.test(href)) {
          href += '?';
        }
        href += '&pageMapping=1';
      }
      params = { url: encodeURIComponent(href) };
    }
    const url = `tencentk12://openpage/${act}?url=${params.url}`;

    const ua = navigator.userAgent.toLowerCase();
    if (isWeixin) {
      openUrlByIframe(url, onfail);
      return;
    }

    if (mqq.android && window.chrome && /chrome/gi.test(ua)) {
      // chrome安全策略
      const tarUrl = `${url}#Intent;scheme=tencentk12;package=com.tencent.k12;end`;
      window.location.href = tarUrl;
    } else {
      openAppPage(act, params);
    }
  }

  downLoad() {
    if (isiOS) {
      window.location = IOS_APP_STORE;
    } else {
      let addr = '/cgi-bin/app/download?platform=android';
      if (this.props.qudao) {
        addr = `//pub.idqqimg.com/pc/misc/groupgift/fudao/${this.props.qudao}.apk`;
      }
      window.location = addr;
    }
  }

  render() {
    const { btnWording, isShowBtn = true } = this.props;
    let isShowDownload = true;
    if (typeof navigator !== 'undefined') {
      const ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf('channel/googleplay') > -1) {
        isShowDownload = false;
      }
    }
    if (!(isShowDownload && !isInFudao)) {
      return null;
    }

    // 产品需求：QQ钱包里不展示下载入口
    if (getParams('coupon') === 'QQWALLET') {
      return null;
    }

    const url = require('pages/qq_learning/images/fudao60.png');

    const title = this.props.wording || '企鹅辅导-让学习更简单';
    const cls = cx({
      'download-cont': true,
      'border-bottom-none': !!this.props.noBorder,
      fixed: !!this.props.fixed,
    });

    if (this.props.autodetect === true && isInFudao) {
      return null;
    }

    let width = '';
    if (typeof window !== 'undefined') {
      // 兼容服务器端
      const windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth);
      width = windowWidth - 145;
    }

    return (
      <div className={cls} onClick={this.onClick}>
        <Img src={url} />
        <div className="download-main">
          <div className="download-title" style={{ width }}>
            {title}
          </div>
        </div>
        {!!width &&
          isShowBtn && (
            <a className="download-btn" href="javascript:void(0);">
              {btnWording || '打开'}
            </a>
          )}
      </div>
    );
  }
}

Download.defaultProps = {
  autodetect: true,
};

export default Download;
