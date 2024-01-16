import MySlider from '@/components/Slider/MySlider';
import { catalogApi } from '@/utils/services/api/catalogApi';
import DefaultLayout from '../ShareLayout/DefaultLayout';

async function getData() {
  const res = await catalogApi();
  return res;
}

async function HomePage() {
  const data = await getData();
  const { catalogsWithMenus, imagePath } = data?.data;
  const monMoi = catalogsWithMenus.find((catalog: any) => catalog.slug === 'mon-moi').menus;
  const monDacBiet = catalogsWithMenus.find((catalog: any) => catalog.slug === 'mon-dac-biet').menus;
  const newcatalogsWithMenus = catalogsWithMenus.sort((a: any, b: any) => {
    if (a.slug === 'mon-dac-biet') return -1;
    if (b.slug === 'mon-dac-biet') return 1;
    if (a.slug === 'mon-moi') return -1;
    if (b.slug === 'mon-moi') return 1;
    if (a.room === 'nuoc-ngot') return 1;
    if (b.room === 'nuoc-ngot') return -1;
    if (a.room === 'bia') return 1;
    if (b.room === 'bia') return -1;
    if (a.room === 'ruou') return -1;
    if (b.room === 'ruou') return 1;
    return 0;
  }) as any[];
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
        headerSlider={{ title: 'Món mới', extendTitle: { title: 'Xem thêm', url: '/menu?=mon-moi' } }}
      />
      <MySlider
        data={{ items: newcatalogsWithMenus, imagePath }}
        headerSlider={{ title: 'Categories', extendTitle: { title: 'Xem thêm', url: '/menu' } }}
      />
    </DefaultLayout>
  );
}

export default HomePage;
