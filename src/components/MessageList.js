import { Box, Text, Image } from "@skynexui/components";
import React from "react";
import config from "../config.json";

const MessageList = (props) => {
  const messages = props.messages;
  const username = 'deboragoncalves';

  return (
    <>
      <Box
        tag="ul"
        styleSheet={{
          overflow: "scroll",
          display: "flex",
          flexDirection: "column-reverse",
          flex: 1,
          color: config.theme.colors.neutrals["000"],
          marginBottom: "16px",
        }}
      >
        {messages.map(message => {
          return (
            <Text
            key={message.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",
              hover: {
                backgroundColor: config.theme.colors.neutrals[700],
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: "8px",
              }}
            >
              <Image
                styleSheet={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                }}
                src={`https://github.com/${username}.png`}
              />
              <Text tag="strong">{message.from}</Text>
              <Text
                styleSheet={{
                  fontSize: "10px",
                  marginLeft: "8px",
                  color: config.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {new Date().toLocaleDateString()}
              </Text>
            </Box>
            {message.textMessage}
          </Text>
          )
        })}
      </Box>
    </>
  );
};

export default MessageList;
