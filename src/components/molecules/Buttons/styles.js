import styled from 'styled-components'
import { theme } from '../../../styles'

//Botao Continue
export const EnterButton = styled.TouchableOpacity`
  background-color: #ffd740;
  padding: 15px;
  border-radius: 30px;
  align-items: center;
  margin-top: 20px;
`

export const EnterButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`

//----------------

//Botao Registro
export const BtnRegistro = styled.TouchableOpacity`
  background: ${props => props.theme.primary};
  border-radius: ${theme.metrics.px(20)}px;
  border-width: ${theme.metrics.px(1)}px;
  border-color: ${props => props.theme.yellow};
  padding-vertical: ${theme.metrics.px(10)}px;
  padding-horizontal: ${theme.metrics.px(20)}px;
  width: ${theme.metrics.px(210)}px;
  align-items: center;
  align-self: center;
`

export const BtnRegistroText = styled.Text`
  color: ${(props) => props.theme.text};
  font-size: ${theme.metrics.px(16)}px;
`

//---------------------

//Botao Cadastro
export const BtnCadastro = styled.TouchableOpacity`
  background: ${(props) => props.theme.background};
  padding-vertical: ${theme.metrics.px(10)}px;
  align-items: center;
  border-radius: ${theme.metrics.px(15)}px;
  border-width: ${theme.metrics.px(2)}px;
  border-color: ${(props) => props.theme.yellow};
  width: ${theme.metrics.px(232)}px;
  align-self: center;
  margin-top: ${theme.metrics.px(15)}px;
  margin-bottom: ${theme.metrics.px(20)}px;
`

export const BtnCadastroText = styled.Text`
  font-size: ${theme.metrics.px(18)}px;
  color: ${(props) => props.theme.text};
`
//----------------

//Botão Crianças
export const BtnCrianças = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background: ${(props) => props.theme.primary};
    width: ${theme.metrics.px(155)}px;
  height: ${theme.metrics.px(50)}px;
  padding: ${theme.metrics.px(11)}px;
  border-radius: ${theme.metrics.px(10)}px;
  min-width: 40%;
  justify-content: center;
`

export const BtnCriançasText = styled.Text`
  margin-left: ${theme.metrics.px(10)}px;
  font-size: ${theme.metrics.px(20)}px;
  justify-content: center;
  color: ${(props) => props.theme.text};
`
//---------------

//Btn Edite
export const BtnEdit = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background: ${(props) => props.theme.primary};
  padding: ${theme.metrics.px(11)}px;
  border-radius: ${theme.metrics.px(10)}px;
  min-width: 40%;
  justify-content: center;
`

export const BtnEditeText = styled.Text`
  margin-left: ${theme.metrics.px(10)}px;
  font-size: ${theme.metrics.px(20)}px;
  justify-content: center;
  color: ${(props) => props.theme.text};
`
//----------------------

//Botão Crianças
export const BtnVagas = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background: ${(props) => props.theme.primary};
  width: ${theme.metrics.px(155)}px;
  height: ${theme.metrics.px(50)}px;
  padding: ${theme.metrics.px(11)}px;
  border-radius: ${theme.metrics.px(10)}px;
  min-width: 40%;
  justify-content: center;
`

export const BtnVagasText = styled.Text`
  margin-left: ${theme.metrics.px(10)}px;
  font-size: ${theme.metrics.px(20)}px;
  justify-content: center;
  color: ${(props) => props.theme.text};
`
//---------------

//Btn Profile de Configurações
export const BtnProfile = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  align-self: center;
  background: ${(props) => props.theme.primary};
  padding: ${theme.metrics.px(15)}px;
  border-radius: ${theme.metrics.px(10)}px;
  margin-bottom: ${theme.metrics.px(30)}px;
  width: ${theme.metrics.px(381)}px;
  height: ${theme.metrics.px(133)}px;
`
export const ProfileImage = styled.View`
  width: ${theme.metrics.px(80)}px,
  height: ${theme.metrics.px(80)}px,
  borderRadius: ${theme.metrics.px(40)}px,
  marginRight: ${theme.metrics.px(15)}px,
`
export const ProfileInfo = styled.View`
  flex: 1;
`
export const ProfileName = styled.Text`
  font-size: ${theme.metrics.px(20)}px;
  font-weight: bold;
  color: ${(props) => props.theme.text};
`
export const ProfilePhone = styled.Text`
  font-size: ${theme.metrics.px(15)}px;
  color: ${(props) => props.theme.textsecondary};
`
export const ProfileEmail = styled.Text`
  font-size: ${theme.metrics.px(15)}px;
  color: ${(props) => props.theme.textsecondary};
`
//--------------

//Btn YourAccount
export const BtnYourAccount = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: ${theme.metrics.px(15)}px;
  border-bottom-width: ${theme.metrics.px(1)}px;
  border-bottom-color: ${(props) => props.theme.yellow};
`
export const IconAcContainer = styled.View`
  flex-direction: row;
  align-items: center;
`
export const TextAcContainer = styled.View`
  margin-left: ${theme.metrics.px(10)}px;
`
export const OptionTextAc = styled.Text`
  font-size: ${theme.metrics.px(16)}px;
  color: ${(props) => props.theme.text};
`
export const SubTextAc = styled.Text`
  font-size: ${theme.metrics.px(12)}px;
  color: ${(props) => props.theme.textsecondary};
`
//---------------------

//Btn Criança das Configurações
export const BtnCriançaOption = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: ${theme.metrics.px(15)}px;
  border-bottom-width: ${theme.metrics.px(1)}px;
  border-bottom-color: ${(props) => props.theme.yellow};
`
export const IconCrContainer = styled.View`
  flex-direction: row;
  align-items: center;
`
export const OptionTextCr = styled.Text`
  font-size: ${theme.metrics.px(16)}px;
  margin-left: ${theme.metrics.px(12)}px;
  color: ${(props) => props.theme.text};
`
//---------------------

//Btn Acessibilidade
export const BtnAcessibilidadeOption = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: ${theme.metrics.px(15)}px;
  border-bottom-width: ${theme.metrics.px(1)}px;
  border-bottom-color: ${(props) => props.theme.yellow};
`
export const IconAcesContainer = styled.View`
  flex-direction: row;
  align-items: center;
`
export const TextAcesContainer = styled.View`
  margin-left: ${theme.metrics.px(10)}px;
`
export const OptionTextAces = styled.Text`
  font-size: ${theme.metrics.px(16)}px;
  margin-left: ${theme.metrics.px(12)}px;
  color: ${(props) => props.theme.text};
`
//---------------------

//Btn Senha
export const BtnSenha = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: ${theme.metrics.px(16)}px;
  border-bottom-width: ${theme.metrics.px(1)}px;
  border-bottom-color: ${(props) => props.theme.yellow};
`
export const ContentSenha = styled.View`
  flex-direction: row;
  align-items: center;
`
export const TextButtonSenha = styled.Text`
  font-size: ${theme.metrics.px(18)}px;
  margin-left: ${theme.metrics.px(16)}px;
  color: ${(props) => props.theme.text};
`
//---------------

//Btn Atualizar
export const BtnAtualizar = styled.TouchableOpacity`
  background: ${(props) => props.theme.yellow};
  padding: 10px 20px;
  border-radius: ${theme.metrics.px(20)}px;
  align-items: center;
`

export const TextButtonAtual = styled.Text`
  font-size: ${theme.metrics.px(20)}px;
  color: #EEEEEE;
`
//---------------

//Btn Tema
export const BtnTema = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: ${theme.metrics.px(16)}px;
  border-bottom-width: ${theme.metrics.px(1)}px;
  border-bottom-color: ${(props) => props.theme.yellow};
`
export const ContentTema = styled.View`
  flex-direction: row;
  align-items: center;
`
export const TextButtonTema = styled.Text`
  font-size: ${theme.metrics.px(16)}px;
  margin-left: ${theme.metrics.px(16)}px;
  color: ${(props) => props.theme.text};
`
export const OptionRightTema = styled.Text`
  flex-direction: row;
  align-items: center;
`
export const OptionSubTextTema = styled.Text`
  font-size: ${theme.metrics.px(14)}px;
  color: ${(props) => props.theme.textsecondary};
  margin-right: ${theme.metrics.px(8)}px;
`
//-------------------

//Btn Idioma
export const BtnIdioma = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: ${theme.metrics.px(16)}px;
  border-bottom-width: ${theme.metrics.px(1)}px;
  border-bottom-color: ${(props) => props.theme.yellow};
`
export const ContentIdioma = styled.View`
  flex-direction: row;
  align-items: center;
`
export const TextButtonIdoma = styled.Text`
  font-size: ${theme.metrics.px(16)}px;
  margin-left: ${theme.metrics.px(16)}px;
  color: ${(props) => props.theme.text};
`
export const OptionRightIdioma = styled.Text`
  flex-direction: row;
  align-items: center;
`
export const OptionSubTextIdioma = styled.Text`
  font-size: ${theme.metrics.px(14)}px;
  color: ${(props) => props.theme.textsecondary};
  margin-right: ${theme.metrics.px(8)}px;
`
//-----------------

//Radio Button
export const BtnRadioContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-vertical: ${theme.metrics.px(5)}px;
`
export const TextContainer = styled.View`
  flex: 1;
  justify-content: center;
`
export const RadioButton = styled.View`
  width: ${theme.metrics.px(30)}px;
  height: ${theme.metrics.px(30)}px;
  border-radius: ${theme.metrics.px(15)}px;
  border-width: ${theme.metrics.px(2)}px;
  border-color: ${(props) => props.theme.border};
  justify-content: center;
  align-items: center;
  margin-left: ${theme.metrics.px(10)}px;
  background: ${(props) => props.theme.background};
`
export const OptionTextRadio = styled.Text`
  fontsize: ${theme.metrics.px(32)}px;
  color: ${(props) => props.theme.text};
  text-align: left;
`
//---------------------
//Radio Button
export const BtnSettings = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: ${theme.metrics.px(20)}px;
`
export const TextBtnSettings = styled.Text`
  margin-left: ${theme.metrics.px(15)}px;
  font-size: ${theme.metrics.px(20)}px;
  color: ${(props) => props.theme.text};
`
//---------

//Btn Manege Routes
export const BtnManageRoutes = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: ${theme.metrics.px(155)}px;
  height: ${theme.metrics.px(50)}px;
  background: ${(props) => props.theme.primary};
  padding: ${theme.metrics.px(11)}px;
  border-radius: ${theme.metrics.px(10)}px;
  min-width: 40%;
  justify-content: center;
`
export const BtnManegeRoutesText = styled.Text`
  margin-left: ${theme.metrics.px(10)}px;
  font-size: ${theme.metrics.px(20)}px;
  justify-content: center;
  color: ${(props) => props.theme.text};
`
//---------------

//Botao Continue
export const BtnMessage = styled.TouchableOpacity`
  background: ${(props) => props.theme.primary};
  padding-vertical: ${theme.metrics.px(10)}px;
  padding-horizontal: ${theme.metrics.px(20)}px;
  width: ${theme.metrics.px(275)}px;
  height: ${theme.metrics.px(40)}px;
  align-items: center;
  margin-bottom: ${theme.metrics.px(20)}px;
  border-radius: ${theme.metrics.px(20)}px;
  border-width: ${theme.metrics.px(1)}px;
  border-color: ${(props) => props.theme.yellow};
  align-self: center;
`

export const BtnMessageText = styled.Text`
  color: ${props => props.theme.text};
  font-size: ${theme.metrics.px(16)}px;
`