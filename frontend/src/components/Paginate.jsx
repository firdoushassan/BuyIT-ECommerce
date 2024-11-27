import React from 'react';
import { Container, Pagination } from 'react-bootstrap';
import styled from 'styled-components';

const StyledPagination = styled(Pagination)`
  background-color: transparent;
  color: #F1F0E8 !important;  
`;

const StyledPaginationItem = styled(Pagination.Item)`
  background-color: #B3C8CF !important;  
  border: none !important;
  color: #333 !important;
  margin: 0 2px;

  &:hover {
    background-color: #89A8B2 !important; 
    color: #fff !important;
  }

  &.active {
    background-color: #E5E1DA !important;
    color: #333 !important;
  }

  &.disabled {
    color: #B3C8CF !important;
    cursor: not-allowed;
  }
`;

const StyledPaginationEllipsis = styled(Pagination.Ellipsis)`
  color: #B3C8CF !important;
`;

const Paginate = ({ currentPage, totalPage, pageHandler }) => {
  return (
    <Container className="d-flex justify-content-center mt-5">
      <StyledPagination size="sm">
        <StyledPaginationItem
          onClick={() => pageHandler(1)}
          disabled={currentPage <= 1}
        >
          First
        </StyledPaginationItem>
        <StyledPaginationItem
          onClick={() => pageHandler(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          Prev
        </StyledPaginationItem>
        {[...Array(totalPage)].map((_, i) => {
          if (i < 4 || i > totalPage - 4 || (i >= currentPage - 2 && i <= currentPage + 2)) {
            return (
              <StyledPaginationItem
                key={i}
                active={i + 1 === currentPage}
                onClick={() => pageHandler(i + 1)}
              >
                {i + 1}
              </StyledPaginationItem>
            );
          }
          if (i === 4 || i === totalPage - 4) {
            return <StyledPaginationEllipsis key={i} />;
          }
          return null;
        })}
        <StyledPaginationItem
          onClick={() => pageHandler(currentPage + 1)}
          disabled={currentPage >= totalPage}
        >
          Next
        </StyledPaginationItem>
        <StyledPaginationItem
          onClick={() => pageHandler(totalPage)}
          disabled={currentPage >= totalPage}
        >
          Last
        </StyledPaginationItem>
      </StyledPagination>
    </Container>
  );
};
export default Paginate;
