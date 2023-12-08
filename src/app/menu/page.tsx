import { Wrapper } from '@/components/CustomComponents/CustomMui';
import RenderContent from '@/components/renderContent/RenderContent';
import { catalogApi } from '@/utils/services/api/catalogApi';
import { Box, Typography } from '@mui/material';
import CategoriesSlider from './CategoriesSlider';
import DefaultLayout from '../ShareLayout/DefaultLayout';
import withLayout from '../hoc/withLayout';

async function getData() {
  const res = await catalogApi();
  return res;
}

const Menu = async () => {
  const data = await getData();
  const { catalogsWithMenus, imagePath } = data?.data;
  catalogsWithMenus.sort((a: any, b: any) => {
    if (a.slug === 'mon-dac-biet') return -1;
    if (b.slug === 'mon-dac-biet') return 1;
    if (a.slug === 'cac-mon-moi') return -1;
    if (b.slug === 'cac-mon-moi') return 1;
    if (a.room === 'nuoc-ngot') return 1;
    if (b.room === 'nuoc-ngot') return -1;
    if (a.room === 'bia') return 1;
    if (b.room === 'bia') return -1;
    if (a.room === 'ruou') return -1;
    if (b.room === 'ruou') return 1;
    return 0;
  });

  return (
    <Box>
      <CategoriesSlider />
      <Box sx={{ mt: '50px' }}>
        {catalogsWithMenus.map((item: any, index: number) => {
          return (
            <Box
              // className="scrollspy-categories"
              key={item.slug}
              id={item.slug}
              sx={{
                paddingTop: '20px',
                paddingBottom: '30px',
                borderBottom: '3px solid #efeef5',
                backgroundColor: index % 2 === 0 ? '#fff' : '#f5f5f5',
              }}
            >
              <Wrapper sx={{ flexDirection: 'column', width: '100%', alignItems: 'start' }}>
                <Typography
                  sx={{
                    fontSize: '2rem',
                    fontWeight: 700,
                    mb: '10px',
                    textTransform: 'uppercase',
                    color: 'grey',
                  }}
                >
                  {item.name}
                </Typography>
                <Box
                  sx={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: 'repeat( auto-fill, minmax(200px, 1fr))',
                      md: 'repeat( auto-fill, minmax(250px, 1fr))',
                    },
                    gridAutoRows: 'auto',
                    gap: {
                      xs: '2px',
                      md: '5px',
                      xl: '10px',
                    },
                  }}
                >
                  <RenderContent imagePath={imagePath} items={item.menus} />
                </Box>
              </Wrapper>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default withLayout(Menu, DefaultLayout);
