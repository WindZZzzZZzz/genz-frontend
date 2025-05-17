import { Input, Button, Stack, FormLabel, Typography, Box } from '@mui/joy';
import FundSelect from './FundSelect';
import { useState } from 'react';

export default function SelectFormSubmission({ filterOption, originData, filteredDataSetter }) {

	const [conditions, setConditions] = useState({});

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;

		setConditions((prev) => ({
			...prev,
			[name]: value,
		}));
	};


	const handleSubmit = (event) => {
		event.preventDefault();
		const filtered = originData.filter((item) => {
			const matchesKeyword = !conditions.keyword || item['Fund Name']?.toLowerCase().includes(conditions.keyword.toLowerCase()) || item['Organisation']?.toLowerCase().includes(conditions.keyword.toLowerCase());
			const matchesRegion = !conditions.region || conditions.region.length === 0 || conditions.region.some(region => item['Region']?.includes(region));
			const matchesAge = !conditions.age || item['Age Eligibility'] === conditions.age;
			const matchesType = !conditions.type || conditions.type.length === 0 || conditions.type.some(type => item['Type of Funding']?.includes(type));
			return matchesKeyword && matchesRegion && matchesAge && matchesType;
		});
		filteredDataSetter(filtered);
	};

  const clearFilter = (event) => {
    event.preventDefault();
    setConditions({});
    filteredDataSetter(originData);
  }

  return (
    <form
      onSubmit={handleSubmit}
    >
      <Stack
        spacing={{ xs: 2, sm: 5, md: 5}}
        sx={{
          padding: '2rem',
          backgroundColor: 'lightpink',
          width: { xs: '100%', sm: '90%', md: '30rem' },
          mx: 'auto',
        }}
      >
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
					<Typography level="h1">Funding Opportunities</Typography>
					<Typography level="body-md">
						Use the table to explore funding opportunities tailored to your needs. We're committed to gathering and sharing youth-focused funding options from across Aotearoa.
					</Typography>
				</Box>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ alignItems: 'center', justifyContent: 'space-between' }} 
        >
          <FormLabel htmlFor="keyword">Keyword</FormLabel>
          <Input
            id="keyword"
            placeholder="Type in here…"
            variant="outlined"
            name="keyword"
            sx={{ width: { xs: '100%', sm: '15rem' }}}
						onChange={handleChange}
          />
        </Stack>

        <FundSelect
          name="region"
          label="Region"
          placeholder="Select Region"
          options={filterOption?.regions}
          multiple
          value={conditions.region || []}
					onChange={handleChange}
        />
        <FundSelect
          name="age"
          label="Age Eligibility"
          placeholder="Select Age"
          options={filterOption?.ages}
          value={conditions.age || null}
					onChange={handleChange}
        />
        <FundSelect
          name="type"
          label="Type of Fund"
          placeholder="Select Fund Type"
          options={filterOption?.types}
          multiple
          value={conditions.type || []}
					onChange={handleChange}
        />

        <Stack direction='row' display='flex' justifyContent='space-between' alignItems='center' gap={2}>
          <Button type="submit" sx={{ maxWidth: 100, backgroundColor: 'black',
            color: 'white',
            '&:hover': {
              backgroundColor: '#333',
            },}}>Search</Button>
          <Button type="button" sx={{ maxWidth: 200, backgroundColor: 'black',
            color: 'white',
            '&:hover': {
              backgroundColor: '#333',
            },}} onClick={clearFilter}>Clear Filter</Button>
        </Stack>
      </Stack>
    </form>
  );
}
