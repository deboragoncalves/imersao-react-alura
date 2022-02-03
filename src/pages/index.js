import TextComponent from '../components/TextComponent';
import config from '../config.json';
import axios from 'axios';

import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import { useState } from 'react';
import { useRouter } from 'next/router';

const Main = () => {
  // Box = div

  // useState = array com dois elementos: variável e set
  const [username, setUsername] = useState('deboragoncalves');
  const [isUsernameValid, setUsernameValid] = useState(true);

  const BASE_URL_GITHUB = 'https://api.github.com/users/';
  const [urlGithub, setUrlGithub] = useState(`${BASE_URL_GITHUB}${username}`);

  // router: objeto
  let router = useRouter();

  let changeUsername = (event) => {
    setUsername(event.target.value);

    // Se for > 2, imagem visivel
    setUsernameValid(username.length > 2);

    // Set url Github
    setUrlGithub(`${BASE_URL_GITHUB}${username}`);
  };

  let submitForm = (event) => {
    // Prevent default impede de recarregar a página ao fazer o submit
    event.preventDefault();
    router.push(`/chat?username=${username}`);
  };

  let navigateSite = () => {
    if (!!username && !!urlGithub) {
      axios.get(`${urlGithub}`).then((githubData) => {
        // Requisição get para obter url

        if (!!githubData.data.blog) window.location.href = githubData.data.blog;
      });
    }
  };

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage:
            'url(https://secure.static.tumblr.com/87c6045a0f7f31592ecc2b882f7082ae/oueswek/6kln94a6h/tumblr_static_tumblr_m6cqcdq28d1rp9sauo1_500.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%',
            maxWidth: '700px',
            borderRadius: '5px',
            padding: '32px',
            margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: config.theme.colors.neutrals[700],
          }}
        >
          <Box
            as='form'
            onSubmit={submitForm}
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: { xs: '100%', sm: '50%' },
              textAlign: 'center',
              marginBottom: '32px',
            }}
          >
            <TextComponent tag='h2'>Bem vindo!</TextComponent>
            <Text
              variant='body3'
              styleSheet={{
                marginBottom: '32px',
                color: config.theme.colors.neutrals[300],
              }}
            >
              {config.name}
            </Text>

            <TextField
              id='inputUsername'
              fullWidth
              value={username}
              onChange={changeUsername}
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
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: config.theme.colors.neutrals['000'],
                mainColor: config.theme.colors.primary[500],
                mainColorLight: config.theme.colors.primary[400],
                mainColorStrong: config.theme.colors.primary[600],
              }}
            />
          </Box>

          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
                visibility: isUsernameValid ? 'visible' : 'hidden',
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant='body4'
              styleSheet={{
                color: config.theme.colors.neutrals[200],
                padding: '3px 10px',
                borderRadius: '1000px',
              }}
            >
              {username}
            </Text>
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
                marginTop: '20px',
                width: '54px',
                height: '54px',
                cursor: 'pointer',
              }}
              src='https://image.flaticon.com/icons/png/512/189/189688.png'
              alt='Website'
              onClick={navigateSite}
            ></Image>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Main;

/* TODO: 

Separar em componentes 
Validar formulário antes do click
Exibir mensagem erro quando mensagem for vazia
Deletar mensagem enviada
Loading ao carregar página de chat
Componente com infos no event mouseover - foto usuário - chat.js
Adicionar sticker/gif 

*/
