import MainGrid from '../src/components/mainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from "../src/lib/AlurakutCommons"
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSideBar(prop){
  return (
    <Box className="profileArea" style={{gridArea: 'profileArea'}}>
      <img src={`https://github.com/${prop.githubUser}.png`} style={{borderRadius: '8px' }} />
    </Box>
  )
  
}
export default function Home() {
  const githubUser = "henriqueBenemon";
  const pessoasFavoritas = [
    'GuilhermeLimaSP',
    'henriqueBenemon',
    'IgorSPessoa',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho',
  ]

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        {/* <Box style="grid-area: profileArea;"> */}
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          
          <ProfileSideBar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vindo(a) </h1>

            <OrkutNostalgicIconSet />
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              pessoas da comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((data)=>{
                return (
                  <li>
                    <a href={`/users/${data}`} key={data}>
                      <img src={`https://github.com/${data}.png`} />
                      <span>{data}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <Box>
            Comunidade
          </Box>
        </div> 
      </MainGrid>
    </>
  )  
}
