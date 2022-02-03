import { Box, Button, TextField } from "@skynexui/components";
import React, { useEffect } from "react";
import config from "../config.json";
import Header from "../components/HeaderChat";
import MessageList from "../components/MessageList";
import ButtonSticker from "../components/ButtonSticker";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";

const ChatPage = () => {
  let router = useRouter();
  let username = router.query.username;

  // Superbase - lib - simulação banco de dados
  const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzgzMDIzNCwiZXhwIjoxOTU5NDA2MjM0fQ.tbCkcTjrFMZOE061Q_ffhaWP7XOSbAHV2z17Z9DPF7k";
  const SUPABASE_URL = "https://qmyntdtyyfdmqysbaany.supabase.co";
  const SUPERBASE_CLIENT = createClient(SUPABASE_URL, SUPABASE_KEY);

  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  let getDataDB = () => {
    // From recebe como parâmetro o nome da tabela - string
    // Order - recebe como parâmetro uma string, que é o nome do campo (ref). asceding false, inverter ordem
    // Poderia usar created_at

    SUPERBASE_CLIENT.from("messages")
      .select("*")
      .order("id", { ascending: false })
      .then(({ data }) => {
        // Setar lista
        setMessageList(data);
      });
  };

  // UseEffect - quando segundo parâmetro é um array vazio, a função do primeiro parâmetro é chamada ao carregar a página
  // Caso haja alguma variável no array, a função é chamada quando a variável é alterada
  useEffect(getDataDB, []);

  let insertDataDB = (data) => {
    // Método insert recebe um array
    SUPERBASE_CLIENT.from("messages")
      .insert([data])
      .then(({ data }) => {
        // Data: array com o objeto que foi inserido

        // Setar lista de mensagens. spread
        messageList = [data[0], ...messageList];

        setMessageList(messageList);
      });
  };

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
    // Objeto deve ter as chaves = nomes dos campos da tabela
    // Retirar id - autoincremento
    const messageObject = {
      from: username,
      textMessage: message,
    };

    if (!!messageObject.textMessage) {
      // Inserir na tabela
      insertDataDB(messageObject);

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
              <ButtonSticker />
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
