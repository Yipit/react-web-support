# react-web-support

`react-web-support` provides an intercom-like chat window that allows users to submit feedback, bugs, and feature requests. Tickets submitted automatically include a screenshot of the app for context.

<a href="https://www.npmjs.com/package/react-chat-window" target="\_parent">
  <img alt="" src="https://img.shields.io/npm/dm/react-chat-window.svg" />
</a>
<a href="https://github.com/kingofthestack/react-chat-window" target="\_parent">
  <img alt="" src="https://img.shields.io/github/stars/kingofthestack/react-chat-window.svg?style=social&label=Star" />
</a>

![Alt Text](https://puu.sh/xei2F/fd4a121185.gif)

## Installation

```
$ npm install https://github.com/Yipit/react-web-support
```

## Components

# Launcher

`Launcher` is the only component needed to use react-web-support. It will react dynamically to changes in messages. All new messages must be added via a change in props as shown in the example.

Launcher props:

|prop | type   | description |
|-----|--------|---------------|
| *agentProfile | object | Represents your product or service's customer service agent. Fields: teamName, imageUrl|
| onMessageWasSent | function(message) | Called when a message a message is sent with a message object as an argument. |
| messageList | [message] | An array of message objects to be rendered as a conversation. |
| showEmoji | bool | A bool indicating whether or not to show the emoji button


### Message Objects

Message objects are rendered differently depending on their type. Currently, only text and emoji types are supported. Each message object has an `author` field which can have the value 'me' or 'them'.

``` javascript
{
  author: 'them',
  type: 'text',
  data: {
    text: 'some text'
  }
}

{
  author: 'me',
  type: 'emoji',
  data: {
    code: 'someCode'
  }
}

```
