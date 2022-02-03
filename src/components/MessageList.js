import { Box, Text, Image } from "@skynexui/components";
import React from "react";
import config from "../config.json";

const MessageList = (props) => {
  const messages = props.messages;

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
        {messages.map((message) => {
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
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  styleSheet={{
                    marginBottom: "8px",
                    display: "flex",
                  }}
                >
                  <Image
                    styleSheet={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      display: "inline-block",
                      marginRight: "8px",
                    }}
                    src={`https://github.com/${message.from}.png`}
                  />
                  <Text tag="strong"
                    styleSheet={{
                      display: "flex",
                      alignItems: "center"
                    }}
                  >{message.from}</Text>
                </Box>

                <Text
                  styleSheet={{
                    fontSize: "10px",
                    marginLeft: "8px",
                    fontSize: "12px",
                    color: config.theme.colors.neutrals[300],
                  }}
                  tag="span"
                >
                  {new Date().toLocaleDateString()}
                </Text>
              </Box>
              {message.textMessage}
            </Text>
          );
        })}
      </Box>
    </>
  );
};

export default MessageList;
