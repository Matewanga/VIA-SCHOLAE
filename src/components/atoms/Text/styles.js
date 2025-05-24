import styled from "styled-components";
import { theme } from '../../../styles'

export const TitleText = styled.Text`
    font-size: ${theme.metrics.px(30)}px;
    text-align: center;
    margin-bottom: ${theme.metrics.px(20)}px;
    color: ${props => props.theme.text} ;
`

export const LabelText = styled.Text`
    font-size: ${theme.metrics.px(20)}px; 
    color: ${props => props.theme.text};
    margin-bottom: ${theme.metrics.px(2)}px;
`