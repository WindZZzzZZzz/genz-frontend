import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import OpenInNew from '@mui/icons-material/OpenInNew'; // ✅ use a suitable icon

const FundInfoCard = ({ fundInfo }) => {
  return (
    <Card sx={{ minWidth: 320, maxWidth: 800, }}>
      {/* Use fundInfo['Fund Name'] directly */}
      <Typography level="title-lg" sx={{ color:"#306844" }}>
        {fundInfo['Fund Name']}
      </Typography>

      {/* Render other entries */}
      {Object.entries(fundInfo).map(([key, value]) => {
        if (key !== 'Fund Name' && key !== 'Information') {
          return (
            <CardContent key={key} orientation="horizontal" sx={{
              display: 'grid',
              gridTemplateColumns: '180px 1fr',
              gap: 1,
              alignItems: 'start',
              paddingY: 0.5,
            }}>
              <Typography level="body-sm" fontWeight="bold">
                {key}:
              </Typography>
              <Typography level="body-sm">{value}</Typography>
            </CardContent>
          );
        }
        return null;
      })}

      {/* Link to more info */}
      {fundInfo['Information'] && (
        <Button
          component="a"
          href={fundInfo['Information']}
          target="_blank"
          rel="noopener noreferrer"
          startDecorator={<OpenInNew />}
          sx={{ maxWidth: 250, backgroundColor: 'black',
            color: 'white',
            '&:hover': {
              backgroundColor: '#333',
            },}}
        >
          More Information
        </Button>
      )}
    </Card>
  );
};

export default FundInfoCard;
