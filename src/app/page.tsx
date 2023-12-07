import MySlider from '@/components/Slider/MySlider';
import { catalogApi } from '@/utils/services/api/catalogApi';

async function getData() {
  const res = await catalogApi();
  return res;
}

export default async function HomePage() {
  const data = await getData();
  const { catalogsWithMenus, catalogs, imagePath } = data?.data;

  const monMoi = catalogsWithMenus.find((catalog: any) => catalog.slug === 'cac-mon-moi').menus;
  const monDacBiet = catalogsWithMenus.find((catalog: any) => catalog.slug === 'mon-dac-biet').menus;

  return (
    <>
      <MySlider
        data={{ items: monDacBiet, imagePath }}
        headerSlider={{ title: 'Special dish', extendTitle: { title: 'See more', url: '/menu#special-dish' } }}
      />

      <MySlider
        sx={{ backgroundColor: '#f5f5f5' }}
        data={{ items: monMoi, imagePath }}
        headerSlider={{ title: 'New dish', extendTitle: { title: 'See more', url: '/menu#new-dish' } }}
      />
      <MySlider
        data={{ items: catalogs, imagePath }}
        headerSlider={{ title: 'Categories', extendTitle: { title: 'See more', url: '/menu' } }}
      />
    </>
  );
}
