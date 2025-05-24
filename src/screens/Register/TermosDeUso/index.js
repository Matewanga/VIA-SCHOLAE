import React from 'react'
import { TouchableOpacity, ScrollView, Text } from 'react-native'
import { Return } from '../../../components'
import {
  styles,
  Container,
  TitleText,
  Header,
  TermosTitleText,
  TermosText,
  TextEmail,
} from './styles'
import { useNavigation } from '@react-navigation/native'

export const TermosdeUso = () => {
  const navigation = useNavigation()

  return (
    <Container>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
        <Header>
          <TouchableOpacity>
            <Return style={styles.return} onPress={() => navigation.navigate('Register')}/>
          </TouchableOpacity>
          <TitleText>Termos de Uso</TitleText>
        </Header>
        <Text style={styles.bodyText}>
          <TermosTitleText>1. INTRODUÇÃO{'\n'}</TermosTitleText>
          <TermosText>
            Bem-vindo ao Via Scholae. Ao acessar ou utilizar nossos serviços,
            você concorda com os termos e condições descritos neste documento.
            Leia atentamente antes de prosseguir.{'\n\n'}
          </TermosText>

          <TermosTitleText>2. ACEITAÇÃO DOS TERMOS{'\n'}</TermosTitleText>
          <TermosText>
            Ao criar uma conta ou usar o Via Scholae, você confirma que leu,
            entendeu e concorda com os Termos de Uso e nossa Política de
            Privacidade.{'\n\n'}
          </TermosText>

          <TermosTitleText>3. USO DO APLICATIVO{'\n'}</TermosTitleText>
          <TermosText>
            • Requisitos de Elegibilidade: Para utilizar o aplicativo, você deve
            ter pelo menos 18 anos.{'\n'}• Finalidade: O aplicativo é destinado
            a geolocalização do transporte escolar e a comunicação entre
            motorista e responsáveis.{'\n'}• Restrições: Você não deve usar o
            aplicativo para atividades ilegais, prejudiciais ou não autorizadas.
            {'\n\n'}
          </TermosText>

          <TermosTitleText>
            4. REGISTRO E RESPONSABILIDADES DO USUÁRIO{'\n'}
          </TermosTitleText>
          <TermosText>
            • Dados de Cadastro: Você deve fornecer informações verdadeiras e
            mantê-las atualizadas.{'\n'}• Segurança: É sua responsabilidade
            proteger as credenciais de acesso. Não compartilhe sua senha com
            terceiros.{'\n\n'}
          </TermosText>

          <TermosTitleText>
            5. DIREITOS E RESPONSABILIDADES DO DESENVOLVEDOR{'\n'}
          </TermosTitleText>
          <TermosText>
            • Atualizações: Reservamo-nos o direito de modificar o aplicativo e
            os Termos de Uso a qualquer momento.{'\n'}• Suspensão/Encerramento:
            Podemos suspender ou encerrar sua conta em caso de violação dos
            Termos de Uso.{'\n\n'}
          </TermosText>

          <TermosTitleText>
            6. PRIVACIDADE E COLETA DE DADOS{'\n'}
          </TermosTitleText>
          <TermosText>
            • Política de Privacidade: Consulte nossa Política de Privacidade
            para saber como coletamos e usamos seus dados.{'\n'}• Consentimento:
            Ao usar o aplicativo, você concorda com o uso de seus dados conforme
            descrito na Política de Privacidade.{'\n\n'}
          </TermosText>

          <TermosTitleText>
            7. LIMITAÇÕES DE RESPONSABILIDADE{'\n'}
          </TermosTitleText>
          <TermosText>
            • Via Scholae não se responsabiliza por danos diretos ou indiretos
            causados pelo uso indevido do aplicativo.{'\n'}• O uso é fornecido
            "como está", sem garantias adicionais de funcionamento ininterrupto
            ou isenção de erros.{'\n\n'}
          </TermosText>

          <TermosTitleText>
            8. DIREITOS DE PROPRIEDADE INTELECTUAL{'\n'}
          </TermosTitleText>
          <TermosText>
            Todo o conteúdo do aplicativo, incluindo textos, imagens, logotipos
            e código-fonte, é protegido por leis de propriedade intelectual e
            pertence exclusivamente ao Via Scholae.{'\n\n'}
          </TermosText>

          <TermosTitleText>9. RESOLUÇÃO DE CONFLITOS{'\n'}</TermosTitleText>
          <TermosText>
            • Legislação Aplicável: Este termo será regido pelas leis do Brasil.
            {'\n'}• Foro: Em caso de disputa, o foro eleito é o da comarca de
            São Paulo.{'\n\n'}
          </TermosText>

          <TermosTitleText>10. CONTATO{'\n'}</TermosTitleText>
          <TermosText>
            Se tiver dúvidas sobre os Termos de Uso, entre em contato conosco
            pelo e-mail: <TextEmail>viascholae@gmail.com</TextEmail>.{'\n\n'}
          </TermosText>

          <TermosTitleText>POLÍTICA DE PRIVACIDADE{'\n'}</TermosTitleText>
          <TermosText>
            1. INTRODUÇÃO{'\n'}A privacidade dos seus dados é importante para
            nós. Este documento explica como coletamos, usamos, armazenamos e
            protegemos suas informações pessoais ao usar o Via Scholae.{'\n'}
            {'\n'}
          </TermosText>
          <TermosTitleText>2. DADOS COLETADOS{'\n'}</TermosTitleText>
          <TermosText>
            Coletamos os seguintes tipos de informações:{'\n'}
            {'\n'}
            <TermosTitleText>
              2.1. Informações fornecidas por você{'\n'}
            </TermosTitleText>
            • Nome completo{'\n'}• E-mail{'\n'}• Número de telefone{'\n'}•
            Outros dados relevantes, como endereço, CPF, etc.{'\n'}
            {'\n'}
            <TermosTitleText>
              2.2. Informações coletadas automaticamente{'\n'}
            </TermosTitleText>
            • Dados de localização (quando autorizado){'\n'}• Endereço IP{'\n'}•
            Informações do dispositivo (modelo, sistema operacional, versão do
            aplicativo){'\n'}• Histórico de uso e interações no aplicativo{'\n'}
            {'\n'}
          </TermosText>

          <TermosTitleText>
            3. FINALIDADE DO USO DOS DADOS{'\n'}
          </TermosTitleText>
          <TermosText>
            Utilizamos suas informações para os seguintes fins:{'\n'}• Garantir
            o funcionamento do aplicativo.{'\n'}• Personalizar a experiência do
            usuário.{'\n'}• Enviar notificações importantes, como atualizações
            ou alertas.{'\n'}• Cumprir obrigações legais e regulatórias.{'\n'}
            {'\n'}
          </TermosText>

          <TermosTitleText>4. COMPARTILHAMENTO DE DADOS{'\n'}</TermosTitleText>
          <TermosText>
            Seus dados poderão ser compartilhados com:{'\n'}• Parceiros e
            fornecedores: Para viabilizar a prestação do serviço.{'\n'}•
            Autoridades legais: Quando exigido por lei ou ordem judicial.{'\n'}
            {'\n'}
            Nota: Nunca venderemos seus dados a terceiros.{'\n'}
            {'\n'}
          </TermosText>

          <TermosTitleText>
            5. ARMAZENAMENTO E SEGURANÇA DOS DADOS{'\n'}
          </TermosTitleText>
          <TermosText>
            • Armazenamos seus dados em servidores seguros e protegidos contra
            acessos não autorizados.{'\n'}• Suas informações são mantidas
            enquanto forem necessárias para as finalidades descritas ou conforme
            exigido por lei.{'\n'}
            {'\n'}
          </TermosText>

          <TermosTitleText>6. DIREITOS DO USUÁRIO{'\n'}</TermosTitleText>
          <TermosText>
            Você tem os seguintes direitos em relação aos seus dados pessoais:
            {'\n'}• Acesso: Solicitar uma cópia dos seus dados.{'\n'}• Correção:
            Atualizar informações incorretas ou desatualizadas.{'\n'}• Exclusão:
            Solicitar a exclusão dos seus dados (exceto quando houver exigência
            legal para mantê-los).{'\n'}• Revogação de Consentimento: Retirar
            seu consentimento para o uso de dados específicos.{'\n'}
            {'\n'}
            Para exercer esses direitos, entre em contato pelo e-mail
            <TextEmail>viascholae@gmail.com</TextEmail>.{'\n'}
            {'\n'}
          </TermosText>

          <TermosTitleText>
            7. USO DE COOKIES E TECNOLOGIAS SIMILARES{'\n'}
          </TermosTitleText>
          <TermosText>
            Utilizamos cookies para melhorar sua experiência no aplicativo. Eles
            nos ajudam a:{'\n'}• Personalizar o conteúdo exibido.{'\n'}•
            Analisar o desempenho do aplicativo.{'\n'}
            {'\n'}
            Você pode gerenciar as configurações de cookies diretamente no seu
            dispositivo.{'\n'}
            {'\n'}
          </TermosText>

          <TermosTitleText>
            8. ALTERAÇÕES NA POLÍTICA DE PRIVACIDADE{'\n'}
          </TermosTitleText>
          <TermosText>
            Podemos atualizar esta Política de Privacidade periodicamente.
            Notificaremos você sobre mudanças significativas por meio do
            aplicativo ou outros meios apropriados.{'\n'}A data da última
            atualização será indicada no topo deste documento.{'\n'}
            {'\n'}
          </TermosText>

          <TermosTitleText>9. CONTATO{'\n'}</TermosTitleText>
          <TermosText>
            Se tiver dúvidas ou preocupações sobre esta Política de Privacidade,
            entre em contato conosco:{'\n'}• E-mail:
            <TextEmail>viascholae@gmail.com</TextEmail> {'\n'}
            {'\n'}
          </TermosText>

          <TermosTitleText>DECLARAÇÃO DE CONCORDÂNCIA{'\n'}</TermosTitleText>
          <TermosText>
            Ao utilizar o Via Scholae, você concorda com os termos descritos
            nesta Política de Privacidade.{'\n'}
            {'\n'}
          </TermosText>
        </Text>
      </ScrollView>
    </Container>
  )
}
