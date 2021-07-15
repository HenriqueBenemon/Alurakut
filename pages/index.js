import React from 'react'
import MainGrid from '../src/components/mainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from "../src/lib/AlurakutCommons"
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

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
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {prop.title} ({prop.items.length})
      </h2>
      {/* <ul>
        {pessoasFavoritas.map((data, count)=>{
          return (
            (conut <= 5) ? (
              <li key={ data }>
              <a href={`/users/${data}`}>
                <img src={`https://github.com/${data}.png`} />
                <span>{data}</span>
              </a>
            </li>
            ) : ( '' )
          )
        })}
      </ul> */}
    </ProfileRelationsBoxWrapper>
  )
}
export default function Home() {
  const [comunidades, setComunidades] = React.useState([{
    id: '123123123123',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
  const githubUser = "henriqueBenemon";
  const pessoasFavoritas = [
    'GuilhermeLimaSP',
    'henriqueBenemon',
    'IgorSPessoa',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho',
  ];
  const [seguidores, setSeguidores] = React.useState([]);
  React.useEffect(function (){
    fetch('https://api.github.com/users/HenriqueBenemon/following')
    .then((data) => {
        return data.json();
    })
    .then((data) => {
        setSeguidores(data); 
    })
  }, [])
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
                  id: new Date().toISOString(),
                  title: dadosDoForm.get('title'),
                  image: dadosDoForm.get('image')
                };

                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas);
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
          <ProfileRelationBox title="Seguidores" items={seguidores }/>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Meus amigos ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((data, count)=>{
                return (
                  (count <= 5) ? (
                    <li key={ data }>
                    <a href={`/users/${data}`}>
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
                    <a href={`/users/${data.title}`}>
                      <img src={data.image} />
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
