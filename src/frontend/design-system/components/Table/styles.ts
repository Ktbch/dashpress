import styled, { css } from "styled-components";
import { USE_ROOT_COLOR } from "frontend/design-system/theme/root";

export const Th = styled.th<{ $isSortable?: boolean }>`
  padding: 8px;
  vertical-align: middle;
  color: ${USE_ROOT_COLOR("main-text")};
  &:not(:last-child) {
    border-right: 1px solid ${USE_ROOT_COLOR("border-color")};
  }
  ${(props) =>
    props.$isSortable &&
    css`
      cursor: pointer;
    `}
`;
