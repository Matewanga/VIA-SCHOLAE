import styled from "styled-components";
import { theme } from '../../../styles'

export const TitleText = styled.Text`
    font-size: ${theme.metrics.px(30)}px;
    text-align: center;
    margin-bottom: ${theme.metrics.px(20)}px;
    color: ${props => props.theme.text} ;
`

export const CustomLabelText = styled.Text`
    color: ${({ theme, txtColor }) =>
        txtColor && theme[txtColor] ? theme[txtColor] : '#262626'};
    font-size: ${({ fontSize }) =>
        fontSize ? theme.metrics.px(fontSize) + 'px' : theme.metrics.px(14) + 'px'};
    text-align: ${({ textAlign }) => textAlign || 'center'};
    margin-top: ${({ mt }) =>
        mt ? theme.metrics.px(mt) + 'px' : '0px'};
    margin-bottom: ${({ mb }) =>
        mb ? theme.metrics.px(mb) + 'px' : '0px'};
    margin-left: ${({ ml }) =>
        ml ? theme.metrics.px(ml) + 'px' : '0px'};
    margin-right: ${({ mr }) =>
        mr ? theme.metrics.px(mr) + 'px' : '0px'};
`