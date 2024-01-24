import React, { useState } from 'react';
import Pagination from 'react-js-pagination';
import styled from 'styled-components';

const Paging = () => {
  const [page, setPage] = useState(1);

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setPage(page);
  };

  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={6}
      totalItemsCount={27}
      pageRangeDisplayed={5}
      prevPageText={'‹'}
      nextPageText={'›'}
      onChange={handlePageChange}
    />
  );
};

export default Paging;
