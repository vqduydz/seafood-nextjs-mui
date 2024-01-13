import Button from '@/components/Button/Button';
import { IPlace } from '@/context/context';
import { ISubmitForm } from '@/interface/interface';
import { myColors } from '@/styles/color';
import renderPrice from '@/utils/renderPrice';
import { Box, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { FormEvent } from 'react';

interface IPay {
  handlePay: (e: ISubmitForm) => Promise<void>;
  total: number;
  shipFee: number;
  handleCancle: () => void;
  allPlace: IPlace[] | null;
}

export default function Pay({ handlePay, total, shipFee, handleCancle, allPlace }: IPay) {
  return (
    <form
      onSubmit={handlePay}
      style={{ marginBottom: '20px', position: 'sticky', bottom: '0', backgroundColor: myColors.white }}
    >
      {/* Phương thức thanh toán */}
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          flexDirection: 'column',
          padding: '15px 10px',
          borderTop: '1px solid #00000022 ',
          borderRight: '1px solid #00000022 ',
          borderLeft: '1px solid #00000022 ',
          alignItems: 'end',
        }}
      >
        <Typography sx={{ padding: '0 10px' }} fontSize={'1.6rem'} fontWeight={700}>
          CHỌN PHƯƠNG THỨC THANH TOÁN
        </Typography>

        <RadioGroup
          sx={{
            // ml: '20px',
            display: 'flex',
            gap: '5px',
            color: '#333',
            '& label.MuiFormControlLabel-root.MuiFormControlLabel-labelPlacementEnd': {
              borderRadius: '10px',
              height: '50px',
            },
            '& .MuiRadio-root.Mui-checked': { color: '#333' },
            '& span.MuiButtonBase-root.MuiRadio-root': {
              display: 'flex',
              '::after': {
                display: 'block',
                content: `''`,
                height: '40px',
                width: '80px',
                ml: '5px',
                position: 'relative',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundColor: 'transparent',
              },
            },
          }}
          defaultValue="zalopay"
          row
          aria-labelledby="payment-methods"
          name="payment-methods"
        >
          <FormControlLabel
            label=""
            sx={{
              border: '1px solid #333',
              width: 'fit-content',
              position: 'relative',
              '& span.MuiButtonBase-root.MuiRadio-root': {
                display: 'flex',
                '::after': {
                  backgroundImage: `url(/icons/ZaloPay.png)`,
                },
              },
            }}
            value="zalopay"
            control={<Radio />}
          />
          <FormControlLabel
            label=""
            sx={{
              border: '1px solid #333',
              width: 'fit-content',
              position: 'relative',
              '& span.MuiButtonBase-root.MuiRadio-root': {
                display: 'flex',
                '::after': {
                  backgroundImage: `url(/icons/momo.png)`,
                  width: '40px',
                },
              },
            }}
            value="momo"
            control={<Radio />}
          />
          <FormControlLabel
            label=""
            sx={{
              border: '1px solid #333',
              width: 'fit-content',
              position: 'relative',
              '& span.MuiButtonBase-root.MuiRadio-root': {
                display: 'flex',
                '::after': {
                  backgroundImage: `url(/icons/banking.png)`,
                  width: '40px',
                },
              },
            }}
            value="banking"
            control={<Radio />}
          />
        </RadioGroup>
      </Box>
      {/* Thành tiền */}
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          flexDirection: 'column',
          border: '1px solid #00000022 ',
          padding: '15px 20px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            fontSize: '1.8rem',
            gap: '30px',
            justifyContent: 'end',
            alignItems: 'center',
            color: myColors.primary,
          }}
        >
          <Typography fontWeight={700} fontSize={'1.6rem'}>
            Tổng tiền
          </Typography>
          <Typography
            textAlign={'right'}
            fontWeight={700}
            fontSize={'1.6rem'}
            sx={{ display: 'block', width: '120px' }}
          >
            {renderPrice(total)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            fontSize: '1.8rem',
            gap: '30px',
            justifyContent: 'end',
            alignItems: 'center',
            color: myColors.primary,
          }}
        >
          <Typography fontWeight={700} fontSize={'1.6rem'}>
            Phí giao hàng
          </Typography>
          <Typography
            textAlign={'right'}
            fontWeight={700}
            fontSize={'1.6rem'}
            sx={{ display: 'block', width: '120px' }}
          >
            {renderPrice(shipFee)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            fontSize: '1.8rem',
            gap: '30px',
            justifyContent: 'end',
            alignItems: 'center',
            color: myColors.primary,
          }}
        >
          <Typography fontWeight={700} fontSize={'1.6rem'}>
            Tổng tiền thanh toán
          </Typography>
          <Typography
            textAlign={'right'}
            fontWeight={700}
            fontSize={'1.6rem'}
            sx={{ display: 'block', width: '120px' }}
          >
            {renderPrice(total + shipFee)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'end',
          }}
        >
          <Button primary onClick={handleCancle}>
            Hủy
          </Button>
          {
            // !receiver.status &&
            !allPlace ? (
              <Button primary disable>
                Đặt hàng
              </Button>
            ) : (
              <Button primary>Đặt hàng</Button>
            )
          }
        </Box>
      </Box>
    </form>
  );
}
