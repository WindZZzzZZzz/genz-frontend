import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import FundInfoCard from './FundInfoCard'; // your card component

const FundInfoList = ({ fundInfos }) => {
  const itemsPerPage = 5;
  const [page, setPage] = useState(1);
  const [selectedFunds, setSelectedFunds] = useState(fundInfos.slice(0, itemsPerPage));

  const handleChange = (event, value) => {
    event.preventDefault();
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;

  useEffect(() => {
    setSelectedFunds(fundInfos.slice(startIndex, startIndex + itemsPerPage));
  }, [page, fundInfos]);

  return (
    <Stack spacing={2} direction="column"
        flexWrap="wrap"
        justifyContent="center" alignContent="center">
      {/* Cards */}
      {selectedFunds.map((fund, idx) => (
        <FundInfoCard key={idx} fundInfo={fund} />
      ))}

      {/* Pagination controls */}
      <Pagination
        count={Math.ceil(fundInfos.length / itemsPerPage)}
        page={page}
        onChange={handleChange}
        color="primary"
      />
    </Stack>
  );
};

export default FundInfoList;
