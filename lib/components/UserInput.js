'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SendIcon = require('./icons/SendIcon');

var _SendIcon2 = _interopRequireDefault(_SendIcon);

var _EmojiIcon = require('./icons/EmojiIcon');

var _EmojiIcon2 = _interopRequireDefault(_EmojiIcon);

var _EmojiPicker = require('./emoji-picker/EmojiPicker');

var _EmojiPicker2 = _interopRequireDefault(_EmojiPicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserInput = function (_Component) {
  _inherits(UserInput, _Component);

  function UserInput() {
    _classCallCheck(this, UserInput);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.state = {
      inputActive: false
    };
    return _this;
  }

  UserInput.prototype.handleKey = function handleKey(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
      this._submitText(event);
    }
  };

  UserInput.prototype._submitText = function _submitText(event) {
    event.preventDefault();
    var text = this.userInput.textContent;
    if (text && text.length > 0) {
      this.props.onSubmit({
        author: 'me',
        type: 'text',
        data: { text: text }
      });
      this.userInput.innerHTML = '';
    }
  };

  UserInput.prototype._handleEmojiPicked = function _handleEmojiPicked(emoji) {
    this.props.onSubmit({
      author: 'me',
      type: 'emoji',
      data: { emoji: emoji }
    });
  };

  UserInput.prototype.render = function render() {
    var _this2 = this;

    return _react2.default.createElement(
      'form',
      { className: 'sc-user-input ' + (this.state.inputActive ? 'active' : '') },
      _react2.default.createElement('div', {
        role: 'button',
        tabIndex: '0',
        onFocus: function onFocus() {
          _this2.setState({ inputActive: true });
        },
        onBlur: function onBlur() {
          _this2.setState({ inputActive: false });
        },
        ref: function ref(e) {
          _this2.userInput = e;
        },
        onKeyDown: this.handleKey.bind(this),
        contentEditable: 'true',
        placeholder: 'Write a reply...',
        className: 'sc-user-input--text'
      }),
      _react2.default.createElement(
        'div',
        { className: 'sc-user-input--buttons' },
        _react2.default.createElement('div', { className: 'sc-user-input--button' }),
        _react2.default.createElement(
          'div',
          { className: 'sc-user-input--button' },
          this.props.showEmoji && _react2.default.createElement(_EmojiIcon2.default, { onEmojiPicked: this._handleEmojiPicked.bind(this) })
        ),
        _react2.default.createElement(
          'div',
          { className: 'sc-user-input--button' },
          _react2.default.createElement(_SendIcon2.default, { onClick: this._submitText.bind(this) })
        )
      )
    );
  };

  return UserInput;
}(_react.Component);

UserInput.propTypes = process.env.NODE_ENV !== "production" ? {
  onSubmit: _propTypes2.default.func.isRequired,
  showEmoji: _propTypes2.default.bool
} : {};

exports.default = UserInput;
module.exports = exports['default'];