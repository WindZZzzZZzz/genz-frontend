import { useEffect, useState } from 'react';
import './App.css';
import FundInfoForm from './components/FundInfoForm';
import { processCsv, extractFilters } from './utils/CsvUtils';
import FundInfoList from './components/FundInfoList';
import { Box } from '@mui/joy';

function App() {
  const [csvData, setCsvData] = useState([]);
  const [filters, setFilters] = useState({});
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    processCsv('/data/fund_info.csv').then(data => {
      setCsvData(data);
      extractFilters(data).then(filters => {
        setFilters(filters);
        console.log(filters.regions);
      });
      setFilteredData(data);
    });
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        height: '100vh',
        backgroundColor: 'beige',
      }}
    >
      {/* Left side: form */}
      <Box
        sx={{
          flex: 1,
          p: 2,
          borderRight: { md: '1px solid #ccc' },
          overflowY: 'auto',
          backgroundColor: 'lightpink'
        }}
      >
        <FundInfoForm filterOption={filters} originData={csvData} filteredDataSetter={setFilteredData} />
      </Box>

      {/* Right side: list */}
      <Box
        sx={{
          flex: 2,
          p: 2,
          overflowY: 'auto',
        }}
      >
        <FundInfoList fundInfos={filteredData} />
      </Box>
    </Box>
  );
}

export default App;
