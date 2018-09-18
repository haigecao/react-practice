import React, { Component } from 'react';
import classNames from 'classnames';
import UserBar from 'components/UserBar';
import Download from 'components/Download';

import './index.scss';

const refresh = () => window.location.reload();

const DisConnect = () => (
  <div className="errorStatus disConnect">
    <div className="verAlign">
      <div className="bgImage" />
      <div className="bigTitle">当前网络不可用</div>
      <div className="subTitle">请检查你的网络设置</div>
    </div>
  </div>
);

const WrongCourse = () => (
  <div className="errorStatus noCourse">
    <div className="verAlign">
      <div className="bgImage" />
      <div className="bigTitle">暂无课程</div>
      <div className="subTitle">请检查课程是否正确</div>
    </div>
  </div>
);

class PageFail extends Component {
  refresh() {
    window.location.reload();
  }

  render() {
    const { isFixedTop, errMsg = '页面加载失败' } = this.props;

    return (
      <div id="error" className="errorStatus pageFail" onClick={this.refresh}>
        <div
          className={classNames('connnectLoad', {
            connectFixedTop: isFixedTop,
          })}
        >
          <div className="bgImage" />
          <div className="bigTitle">{errMsg}</div>
          <div className="subTitle">点击屏幕，重新加载</div>
        </div>
      </div>
    );
  }
}

const ExamEmpty = () => {
  return (
    <div id="error" className="errorStatus pageFail exam-empty">
      <div className="connnectLoad">
        <div className="bgImage" />
        <div className="bigTitle">正在出题中</div>
      </div>
    </div>
  );
};

const OldTeacher = () => (
  <div className="errorStatus oldTeacher" onClick={refresh}>
    <div className="verAlign">
      <div className="bgImage" />
      <div className="bigTitle">暂无该老师资料</div>
      <div className="subTitle">老师的信息已过期，看看别的吧</div>
    </div>
  </div>
);

const NotBuyThisClass = () => (
  <div>
    <UserBar>
      <Download isShowBtn={false} wording="企鹅辅导" />
    </UserBar>
    <div className="errorStatus oldTeacher" onClick={refresh}>
      <div className="verAlign">
        <div className="bgImage" />
        <div className="bigTitle">获取报名关系失败</div>
        <div className="subTitle">当前账户暂未购买该课程，请确认登录账户</div>
      </div>
    </div>
  </div>
);

const EmptyArticle = () => (
  <div className="errorStatus emptyArticle" onClick={refresh}>
    <div className="verCenter">
      <div className="bgImage" />
      <div className="subTitle">暂无赞过的文章</div>
    </div>
  </div>
);

const EmptyCourse = () => {
  return (
    <div className="no-course empty-tip">
      <div className="wrapper">
        <p className="title">暂无课程</p>
        <p className="description">这位老师还在备课中，请耐心等待</p>
      </div>
    </div>
  );
};

// 测评 列表为空

const EmptyEvaluation = () => (
  <div className="no-evaluation empty-tip">
    <div className="wrapper">
      <p className="title">暂无测试记录</p>
    </div>
  </div>
);

const EmptyComment = () => {
  return (
    <div className="no-comment empty-tip">
      <div className="wrapper">
        <p className="title">暂无评价</p>
        <p className="description">你的评价是我们前进的动力</p>
      </div>
    </div>
  );
};

const LoadCommentFail = () => (
  <div className="comment-fail empty-tip" onClick={refresh}>
    <div className="wrapper">
      <p className="title">评价加载失败</p>
      <p className="description">点击屏幕，重新加载</p>
    </div>
  </div>
);

const ErrorMessage = ({ children, errorMsg, notReload }) => {
  if (notReload) {
    return (
      <div id="error" className="errorStatus pageFail">
        <div className="connnectLoad">
          <div className="bgImage" />
          <div className="bigTitle">{errorMsg || children}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="error"
      className="errorStatus pageFail"
      onClick={() => {
        window.location.reload();
      }}
    >
      <div className="connnectLoad">
        <div className="bgImage" />
        <div className="bigTitle">{errorMsg || children}</div>
        <div className="subTitle">点击屏幕，重新加载</div>
      </div>
    </div>
  );
};

module.exports = {
  DisConnect,
  WrongCourse,
  PageFail,
  OldTeacher,
  EmptyArticle,
  EmptyCourse,
  EmptyComment,
  LoadCommentFail,
  ExamEmpty,
  EmptyEvaluation,
  ErrorMessage,
  NotBuyThisClass,
};
