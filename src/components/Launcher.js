import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ChatWindow from './ChatWindow';
import defaultMessage from './Messages/DefaultMessage'
import {sendEmail} from '../helpers'
import html2canvas from 'html2canvas'
import launcherIcon from './../assets/logo-no-bg.svg';
import launcherIconActive from './../assets/close-icon.png';

class Launcher extends Component {

  constructor() {
    super();
    this.state = {
      launcherIcon,
      messageList: [defaultMessage],
      isOpen: false
    };
    this.handleClick = this.handleClick.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.addSuccessMessage = this.addSuccessMessage.bind(this)
    this.addErrorMessage = this.addErrorMessage.bind(this)
  }

  handleClick() {
    if (this.props.handleClick !== undefined) {
      this.props.handleClick();
    } else {
      this.setState({
        isOpen: !this.state.isOpen,
      });
    }
  }

  onSubmit(message) {
    const {endpoint, user, app, recipient} = this.props
    const url = window.location.href
    const date = (new Date()).toLocaleString()

    html2canvas(
      document.body,
      {scale: parseFloat((600 / window.innerWidth).toFixed(2))}
    ).then((canvas) => {
      const canvasElement = document.body.appendChild(canvas);
      const imageData = canvasElement.toDataURL().replace('data:image/png;base64,', '')

      const email = {
        attachments: [
          {
            content: imageData,
            filename: 'screenshot.png',
            type: 'image/png'
          }
        ],
        from_email: user,
        html: window.btoa(`<h2>App</h2><p>${app}</p><h2>URL</h2><p>${url}<p><h2>Message</h2><p>${message.data.text}</p>`),
        recipient,
        subject: `Support request from ${user} about ${app}`
      }

      sendEmail(endpoint, email, this.addSuccessMessage, this.addErrorMessage)
      canvasElement.remove()
    })

    this.setState((prevState) => ({messageList: [...prevState.messageList, message]}))
  }

  addSuccessMessage() {
    this.setState((prevState) => ({
      messageList: [
        ...prevState.messageList,
        {
          author: 'them',
          type: 'text',
          data: {
            text: `Thanks for submitting your feedback on ${this.props.app}. Someone will reach out shortly. Do not reply to this message or another ticket will be created.`
          }
        }
      ]
    }))
  }

  addErrorMessage() {
    this.setState((prevState) => ({
      messageList: [
        ...prevState.messageList,
        {
          author: 'them',
          type: 'text',
          data: {
            text: 'Oops. Looks like that didn\'t work. Not great for a support feature. Maybe try again?'
          }
        }
      ]
    }))
  }

  render() {
    const isOpen = this.props.hasOwnProperty('isOpen') ? this.props.isOpen : this.state.isOpen;
    const classList = [
      'sc-launcher',
      (isOpen ? 'opened' : ''),
    ];
    return (
      <div>
        <div>
        </div>
        <div className={classList.join(' ')} onClick={this.handleClick}>
          <MessageCount count={this.props.newMessagesCount} isOpen={isOpen} />
          <img className={"sc-open-icon"} src={launcherIconActive} />
          <img className={"sc-closed-icon"} src={launcherIcon} />
        </div>
        <ChatWindow
          messageList={this.state.messageList}
          onUserInputSubmit={this.onSubmit}
          agentProfile={this.props.agentProfile}
          isOpen={isOpen}
          onClose={this.handleClick.bind(this)}
          showEmoji={this.props.showEmoji}
        />
      </div>
    );
  }
}

const MessageCount = (props) => {
  if (props.count === 0 || props.isOpen === true) { return null }
  return (
    <div className={"sc-new-messsages-count"}>
      {props.count}
    </div>
  )
}

Launcher.propTypes = {
  agentProfile: PropTypes.shape({}),
  endpoint: PropTypes.string.isRequired,
  onMessageWasReceived: PropTypes.func,
  onMessageWasSent: PropTypes.func,
  newMessagesCount: PropTypes.number,
  isOpen: PropTypes.bool,
  handleClick: PropTypes.func,
  messageList: PropTypes.arrayOf(PropTypes.object),
  recipient: PropTypes.string.isRequired,
  showEmoji: PropTypes.bool
};

Launcher.defaultProps = {
  agentProfile: {
    imageUrl: 'https://s3.amazonaws.com/yipit-ernie/yd_chat-54.png',
    teamName: 'YipitData'
  },
  newMessagesCount: 0,
  showEmoji: false
}

export default Launcher;
