import { Box, Button, TextField } from "@skynexui/components";
import React from "react";
import config from "../config.json";
import Header from "../components/HeaderChat";
import MessageList from "../components/MessageList";
import { useState } from "react";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  let changeMessage = (event) => {
    setMessage(event.target.value);
  };

  let sendMessageEnter = (event) => {
    if (event.key === "Enter") {
      // Não pular linha no textfield após enviar
      event.preventDefault();

      // Inserir e setar mensagem usando spread
      sendMessage();
    }
  };

  let sendMessageButton = (event) => {
    // Não carregar a página ao clicar
    event.preventDefault();
    sendMessage();
  };

  let sendMessage = () => {
    const messageObject = {
      id: messageList.length + 1,
      from: "deboragoncalves",
      textMessage: message,
    };

    if (!!messageObject.textMessage) {
        // Inserir e setar mensagem usando spread
        messageList = [messageObject, ...messageList];

        setMessageList(messageList);

        // Limpar textarea
        setMessage("");
    }
  };

  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: config.theme.colors.primary[500],
          backgroundImage: `url(https://secure.static.tumblr.com/87c6045a0f7f31592ecc2b882f7082ae/oueswek/6kln94a6h/tumblr_static_tumblr_m6cqcdq28d1rp9sauo1_500.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
          color: config.theme.colors.neutrals["000"],
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            borderRadius: "5px",
            backgroundColor: config.theme.colors.neutrals[700],
            height: "100%",
            maxWidth: "95%",
            maxHeight: "95vh",
            padding: "32px",
          }}
        >
          <Header />
          <Box
            styleSheet={{
              position: "relative",
              display: "flex",
              flex: 1,
              height: "80%",
              backgroundColor: config.theme.colors.neutrals[600],
              flexDirection: "column",
              borderRadius: "5px",
              padding: "16px",
            }}
          >
            {/* 
                - Exibir lista de mensagens na tela, percorrendo através de um map - retorna novo item.
                - Lista precisa de uma chave única

                - Passar a lista de mensagens como props para o componente filho MessageList
                (props.messages)
            */}

            <MessageList messages={messageList} />
            <Box
              as="form"
              styleSheet={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <TextField
                value={message}
                placeholder="Insira sua mensagem aqui..."
                type="textarea"
                onChange={changeMessage}
                onKeyPress={sendMessageEnter}
                styleSheet={{
                  width: "100%",
                  border: "0",
                  resize: "none",
                  borderRadius: "5px",
                  padding: "6px 8px",
                  backgroundColor: config.theme.colors.neutrals[800],
                  marginRight: "12px",
                  color: config.theme.colors.neutrals[200],
                }}
              />

              <Button
                type="submit"
                label="Entrar"
                onClick={sendMessageButton}
                buttonColors={{
                  contrastColor: config.theme.colors.neutrals["000"],
                  mainColor: config.theme.colors.primary[500],
                  mainColorLight: config.theme.colors.primary[400],
                  mainColorStrong: config.theme.colors.primary[600],
                }}
                styleSheet={{
                  height: "40px",
                  cursor: "pointer",
                }}
              ></Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ChatPage;
