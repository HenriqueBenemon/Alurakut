import React from 'react'
import MainGrid from '../src/components/mainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from "../src/lib/AlurakutCommons"
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';

function ProfileSideBar(prop){
  return (
    <Box as="aside">
      <img src={`https://github.com/${prop.githubUser}.png`} style={{borderRadius: '8px' }} />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${prop.githubUser}`}>@{prop.githubUser}</a>
      </p>
      <hr />
        
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
  
}

function ProfileRelationBox(prop){
  const seguidores =  prop.items;
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {prop.title} ({prop.items.length})
      </h2>
      <ul>
        {seguidores.map((data, count)=>{
          return (
            (count <= 5) ? (
              <li key={ data }>
              <a href={`https://github.com/${data}`}>
                <img src={`https://github.com/${data}.png`} />
                <span>{data}</span>
              </a>
            </li>
            ) : ( '' )
          )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home(props) {
  const seguidorLogin = [];
  const seguindoLogin = [];
  const [comunidades, setComunidades] = React.useState([]);
  const githubUser = props.githubUser;
  const [pessoasFavoritas, setPessoasFavoritas] = React.useState([]);
  const [seguidores, setSeguidores] = React.useState([]);
  React.useEffect(function (){
    //Dados do gitHub (followers)
    fetch(`https://api.github.com/users/${githubUser}/followers`)
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      for( let i = 0; i < data.length; i++ ){
        seguidorLogin.push(data[i].login);
      };
        setSeguidores(seguidorLogin);
    });

     //Dados do gitHub (following)
     fetch(`https://api.github.com/users/${githubUser}/following`)
     .then((data) => {
       return data.json();
     })
     .then((data) => {
       for( let i = 0; i < data.length; i++ ){
        seguindoLogin.push(data[i].login);
       };
       setPessoasFavoritas(seguindoLogin);
     });

    //Dados API Dato CMS
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `d27bdff68ccd435d3a09f493d1d162`,
      },
      body: JSON.stringify({
        "query": `query {
          allCommunities {
            id
            title
            imageUrl
            creatorSlug
          }
        }`
      }),
      
    })
    .then((data) => {
      return data.json(); //pega o retorno e transforma em um objeto JSON
    })
    .then((data) => {
      const comunidadesAPI = data.data.allCommunities;
      setComunidades(comunidadesAPI);
    });
    
  }, []);

  return (
    <>
      <AlurakutMenu githubUser={githubUser}/>
      <MainGrid>
        {/* <Box style="grid-area: profileArea;"> */}
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          
          <ProfileSideBar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vindo(a), {githubUser.toLocaleLowerCase()}</h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
              <form onSubmit={function handleCriaComunidade(e){
                e.preventDefault();
                const dadosDoForm = new FormData(e.target);
                const comunidade = {
                  title: dadosDoForm.get('title'),
                  imageUrl: dadosDoForm.get('image'),
                  creatorSlug: githubUser,
                };

                fetch("/api/communities", {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(comunidade)
                })
                .then(async (data) => {
                  const dados = await data.json();
                  
                  const comunidade = dados.dadosComunidade;
                  console.log(comunidade);
                  const comunidadesAtualizadas = [...comunidades, comunidade];
                  setComunidades(comunidadesAtualizadas);
                })

                
              }}>
                <div>
                  <input 
                    placeholder="Qual vai ser o nome da sua comunidade?" 
                    name="title" 
                    aria-label="Qual vai ser o nome da sua comunidade?"
                    type="text" 
                  />
                </div>

                <div>
                  <input 
                    placeholder="Coloque uma URL para usarmos de capa" 
                    name="image" 
                    aria-label="Coloque uma URL para usarmos de capa" 
                  />
                </div>

                <button style={{ marginLeft: "3px" }}>Criar Comunidade</button>
              </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationBox title="Seguidores" items={ seguidores } />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Meus amigos ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((data, count)=>{
                return (
                  (count <= 5) ? (
                    <li key={ data }>
                    <a href={`https://github.com/${data}`}>
                      <img src={`https://github.com/${data}.png`} />
                      <span>{data}</span>
                    </a>
                  </li>
                  ) : ( '' )
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Minhas comunidades ({comunidades.length})
            </h2>
              {<ul>
                {comunidades.map((data, count)=>(
                  (count <= 5) ? (
                    <li key={ data.id }>
                    <a href={`/communities/${data.id}`}>
                      <img src={data.imageUrl} />
                      <span>{data.title}</span>
                    </a>
                  </li>
                  ) : ( '' )
                ))}
            </ul>}
          </ProfileRelationsBoxWrapper>
        </div> 
      </MainGrid>
    </>
  )  
}

export async function getServerSideProps(context) {
  const cookie = nookies.get(context);
  const token = cookie.USER_TOKEN;
  const afterToken = jwt.decode(token);
  const githubUser = afterToken?.githubUser;
  console.log(githubUser);

  if (!githubUser) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  
  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
}