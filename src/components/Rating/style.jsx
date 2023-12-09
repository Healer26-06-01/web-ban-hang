import styled from "styled-components";

export const RatingStyle = styled.span`
    display: inline-flex;
    width: 70px;
    height: 18px;
    background: url(/img/star-gray.svg) repeat-x;
    position: relative;

    &:after {
        content: '';
        display: block;
        position: absolute;
        background: url(/img/star-yellow.svg) repeat-x;
        top: 0;
        left: 0;
        width: ${props => props.value / 5 * 100}%;
        height: 100%;
    }
`