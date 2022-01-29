import { TextComponent } from "../components";
import config from '../config.json';

import GlobalStyle from "../GlobalStyles";
import { Box, Button, Text, TextField, Image } from "@skynexui/components";

const Main = () => {
  const username = "deboragoncalves";

  return (
    <>
      <GlobalStyle />
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage:
            "url(https://secure.static.tumblr.com/87c6045a0f7f31592ecc2b882f7082ae/oueswek/6kln94a6h/tumblr_static_tumblr_m6cqcdq28d1rp9sauo1_500.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            width: "100%",
            maxWidth: "700px",
            borderRadius: "5px",
            padding: "32px",
            margin: "16px",
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            backgroundColor: config.theme.colors.neutrals[700],
          }}
        >
          <Box
            as="form"
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", sm: "50%" },
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <TextComponent tag="h2">Bem vindo!</TextComponent>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: "32px",
                color: config.theme.colors.neutrals[300],
              }}
            >
              {config.name}
            </Text>

            <TextField
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: config.theme.colors.neutrals[200],
                  mainColor: config.theme.colors.neutrals[900],
                  mainColorHighlight: config.theme.colors.primary[500],
                  backgroundColor: config.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type="submit"
              label="Entrar"
              fullWidth
              buttonColors={{
                contrastColor: config.theme.colors.neutrals["000"],
                mainColor: config.theme.colors.primary[500],
                mainColorLight: config.theme.colors.primary[400],
                mainColorStrong: config.theme.colors.primary[600],
              }}
            />
          </Box>

          <Box
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "200px",
              padding: "16px",
              flex: 1,
              minHeight: "240px",
            }}
          >
            <Image
              styleSheet={{
                borderRadius: "50%",
                marginBottom: "16px",
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: config.theme.colors.neutrals[200],
                padding: "3px 10px",
                borderRadius: "1000px",
              }}
            >
              {username}
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Main;
