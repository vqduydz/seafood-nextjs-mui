import MySlider from '@/components/Slider/MySlider';
import { catalogApi } from '@/utils/services/api/catalogApi';
import DefaultLayout from '../ShareLayout/DefaultLayout';

async function getData() {
  const res = await catalogApi();
  return res;
}

async function HomePage() {
  const data = await getData();
  const { catalogsWithMenus, catalogs, imagePath } = data?.data;
  const monMoi = catalogsWithMenus.find((catalog: any) => catalog.slug === 'cac-mon-moi').menus;
  const monDacBiet = catalogsWithMenus.find((catalog: any) => catalog.slug === 'mon-dac-biet').menus;

  return (
    <DefaultLayout>
      <MySlider
        menu
        data={{ items: monDacBiet, imagePath }}
        headerSlider={{ title: 'Món đặc biệt', extendTitle: { title: 'Xem thêm', url: '/menu?=mon-dac-biet' } }}
      />
      <MySlider
        menu
        sx={{ backgroundColor: '#f5f5f5' }}
        data={{ items: monMoi, imagePath }}
        headerSlider={{ title: 'Món mới', extendTitle: { title: 'Xem thêm', url: '/menu?=cac-mon-moi' } }}
      />
      <MySlider
        data={{ items: catalogs, imagePath }}
        headerSlider={{ title: 'Categories', extendTitle: { title: 'Xem thêm', url: '/menu' } }}
      />
    </DefaultLayout>
  );
}

export default HomePage;
