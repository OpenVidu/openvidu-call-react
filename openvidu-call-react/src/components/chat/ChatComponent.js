import React, { useState, useEffect, createRef } from "react";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import HighlightOff from "@material-ui/icons/HighlightOff";
import Send from "@material-ui/icons/Send";

import "./ChatComponent.css";
import { Tooltip } from "@material-ui/core";

const ChatComponent = (props) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const chatScroll = createRef();

  useEffect(() => {
    props.user.getStreamManager().stream.session.on("signal:chat", (event) => {
      const data = JSON.parse(event.data);
      messageList.push({
        connectionId: event.from.connectionId,
        nickname: data.nickname,
        message: data.message,
      });
      const document = window.document;
      setTimeout(() => {
        const userImg = document.getElementById(
          "userImg-" + (messageList.length - 1)
        );
        const video = document.getElementById("video-" + data.streamId);
        const avatar = userImg.getContext("2d");
        avatar.drawImage(video, 200, 120, 285, 285, 0, 0, 60, 60);
        props.messageReceived();
      }, 50);
      setMessageList(messageList);
      scrollToBottom();
    });
  });

  const handleChange = (event) => {
    const newMessage = event.target.value;
    setMessage(newMessage);
  };

  const handlePressKey = (event) => {
    event.key === "Enter" && sendMessage();
  };

  const close = () => {
    props.close(undefined);
  };

  const sendMessage = () => {
    console.log(message);
    if (props.user && message) {
      //   let message = message.replace(/ +(?= )/g, "");
      if (message !== "" && message !== " ") {
        const data = {
          message: message,
          nickname: props.user.getNickname(),
          streamId: props.user.getStreamManager().stream.streamId,
        };
        props.user.getStreamManager().stream.session.signal({
          data: JSON.stringify(data),
          type: "chat",
        });
      }
    }
    setMessage("");
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      try {
        chatScroll.current.scrollTop = chatScroll.current.scrollHeight;
      } catch (err) {}
    }, 20);
  };
  const styleChat = { display: props.chatDisplay };
  return (
    <div id="chatContainer">
      <div id="chatComponent" style={styleChat}>
        <div id="chatToolbar">
          <span>
            {props.user.getStreamManager().stream.session.sessionId} - CHAT
          </span>
          <IconButton id="closeButton" onClick={close}>
            <HighlightOff color="secondary" />
          </IconButton>
        </div>
        <div className="message-wrap" ref={chatScroll}>
          {messageList.map((data, i) => (
            <div
              key={i}
              id="remoteUsers"
              className={
                "message" +
                (data.connectionId !== props.user.getConnectionId()
                  ? " left"
                  : " right")
              }
            >
              <canvas
                id={"userImg-" + i}
                width="60"
                height="60"
                className="user-img"
              />
              <div className="msg-detail">
                <div className="msg-info">
                  <p> {data.nickname}</p>
                </div>
                <div className="msg-content">
                  <span className="triangle" />
                  <p className="text">{data.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div id="messageInput">
          <input
            placeholder="Send a messge"
            id="chatInput"
            value={message}
            onChange={handleChange}
            onKeyPress={handlePressKey}
          />
          <Tooltip title="Send message">
            <Fab size="small" id="sendButton" onClick={sendMessage}>
              <Send />
            </Fab>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
