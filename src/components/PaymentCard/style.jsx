import styled from "styled-components";

export const PaymentCardStyle = styled.div`
    &:hover {
        .btn-change-default {
            display: block;
        }
    }

    .btn-change-default {
        position: absolute;
        bottom: 30px;
        right: 30px;
    }
`