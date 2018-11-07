'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ChatWindow = require('./ChatWindow');

var _ChatWindow2 = _interopRequireDefault(_ChatWindow);

var _helpers = require('../helpers');

var _html2canvas = require('html2canvas');

var _html2canvas2 = _interopRequireDefault(_html2canvas);

var _logoNoBg = require('./../assets/logo-no-bg.svg');

var _logoNoBg2 = _interopRequireDefault(_logoNoBg);

var _closeIcon = require('./../assets/close-icon.png');

var _closeIcon2 = _interopRequireDefault(_closeIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Launcher = function (_Component) {
  _inherits(Launcher, _Component);

  function Launcher() {
    _classCallCheck(this, Launcher);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.state = {
      launcherIcon: _logoNoBg2.default,
      messageList: [],
      isOpen: false
    };
    _this.handleClick = _this.handleClick.bind(_this);
    _this.onSubmit = _this.onSubmit.bind(_this);
    _this.addSuccessMessage = _this.addSuccessMessage.bind(_this);
    _this.addErrorMessage = _this.addErrorMessage.bind(_this);
    return _this;
  }

  Launcher.prototype.handleClick = function handleClick() {
    if (this.props.handleClick !== undefined) {
      this.props.handleClick();
    } else {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  };

  Launcher.prototype.onSubmit = function onSubmit(message) {
    var _this2 = this;

    var _props = this.props,
        endpoint = _props.endpoint,
        user = _props.user,
        app = _props.app,
        recipient = _props.recipient;

    var url = window.location.href;
    var date = new Date().toLocaleString();

    (0, _html2canvas2.default)(document.body, { scale: 0.4 }).then(function (canvas) {
      var canvasElement = document.body.appendChild(canvas);
      var imageData = canvasElement.toDataURL().replace('data:image/png;base64,', '');

      var email = {
        attachments: [{
          content: imageData,
          filename: 'screenshot.png',
          type: 'image/png'
        }],
        from_email: user,
        html: window.btoa('<h2>App</h2><p>' + app + '</p><h2>URL</h2><p>' + url + '<p><h2>Message</h2><p>' + message.data.text + '</p>'),
        recipient: recipient,
        subject: 'Support request from ' + user + ' about ' + app
      };

      (0, _helpers.sendEmail)(endpoint, email, _this2.addSuccessMessage, _this2.addErrorMessage);
      canvasElement.remove();
    });

    this.setState(function (prevState) {
      return { messageList: [].concat(prevState.messageList, [message]) };
    });
  };

  Launcher.prototype.addSuccessMessage = function addSuccessMessage() {
    var _this3 = this;

    this.setState(function (prevState) {
      return {
        messageList: [].concat(prevState.messageList, [{
          author: 'them',
          type: 'text',
          data: {
            text: 'Thanks for submitting your feedback on ' + _this3.props.app + '. Someone will reach out shortly. Do not reply to this message or another ticket will be created.'
          }
        }])
      };
    });
  };

  Launcher.prototype.addErrorMessage = function addErrorMessage() {
    this.setState(function (prevState) {
      return {
        messageList: [].concat(prevState.messageList, [{
          author: 'them',
          type: 'text',
          data: {
            text: 'Oops. Looks like that didn\'t work. Not great for a support feature. Maybe try again?'
          }
        }])
      };
    });
  };

  Launcher.prototype.render = function render() {
    var isOpen = this.props.hasOwnProperty('isOpen') ? this.props.isOpen : this.state.isOpen;
    var classList = ['sc-launcher', isOpen ? 'opened' : ''];
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement('div', null),
      _react2.default.createElement(
        'div',
        { className: classList.join(' '), onClick: this.handleClick },
        _react2.default.createElement(MessageCount, { count: this.props.newMessagesCount, isOpen: isOpen }),
        _react2.default.createElement('img', { className: "sc-open-icon", src: _closeIcon2.default }),
        _react2.default.createElement('img', { className: "sc-closed-icon", src: _logoNoBg2.default })
      ),
      _react2.default.createElement(_ChatWindow2.default, {
        messageList: this.state.messageList,
        onUserInputSubmit: this.onSubmit,
        agentProfile: this.props.agentProfile,
        isOpen: isOpen,
        onClose: this.handleClick.bind(this),
        showEmoji: this.props.showEmoji
      })
    );
  };

  return Launcher;
}(_react.Component);

var MessageCount = function MessageCount(props) {
  if (props.count === 0 || props.isOpen === true) {
    return null;
  }
  return _react2.default.createElement(
    'div',
    { className: "sc-new-messsages-count" },
    props.count
  );
};

Launcher.propTypes = process.env.NODE_ENV !== "production" ? {
  agentProfile: _propTypes2.default.shape({}),
  endpoint: _propTypes2.default.string.isRequired,
  onMessageWasReceived: _propTypes2.default.func,
  onMessageWasSent: _propTypes2.default.func,
  newMessagesCount: _propTypes2.default.number,
  isOpen: _propTypes2.default.bool,
  handleClick: _propTypes2.default.func,
  messageList: _propTypes2.default.arrayOf(_propTypes2.default.object),
  recipient: _propTypes2.default.string.isRequired,
  showEmoji: _propTypes2.default.bool
} : {};

Launcher.defaultProps = {
  agentProfile: {
    imageUrl: 'https://s3.amazonaws.com/yipit-ernie/yd_chat-54.png',
    teamName: 'YipitData'
  },
  newMessagesCount: 0,
  showEmoji: true
};

exports.default = Launcher;
module.exports = exports['default'];