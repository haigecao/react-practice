import React from 'react';
import classNames from 'classnames';
import './index.scss';

class FetchingLoading extends React.Component {
  componentWillUnmount() {
    if (!window || window.isSvr) { // 服务器端/直出页面不上报测速
      return;
    }
    // 没有render测速点，且没有keyCgi或者，有keycgi且有cgiEnd时，上报测速
    if (!window.T.render && (!window.keyCgi || window.T.cgiEnd)) {
      window.T.render = Date.now();
    }
  }

  render() {
    const { isFixedTop } = this.props;
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        fontSize: 0,
        zIndex: 999,
        textAlign: 'center',
      }}
      >
        <div className={classNames('fetchingLoad', { fetchingFixedTop: isFixedTop })}>
          加载中...
          {this.props.children}
        </div>
        <div style={{
          display: 'inline-block',
          height: '100%',
          width: '1px',
          marginLeft: '-1px',
          content: '',
          verticalAlign: 'middle',
        }}
        />
      </div>
    );
  }
}

FetchingLoading.defaultProps = {
  isFixedTop: false,
};

export default FetchingLoading;
