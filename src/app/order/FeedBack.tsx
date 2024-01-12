import Button from '@/components/Button/Button';
import { useMyContext } from '@/context/context';
import { IOrderItems } from '@/interface/interface';
import { myColors } from '@/styles/color';
import { createNewFeedbackApi } from '@/utils/services/api/feedbackapi';
import { Box, Rating, TextareaAutosize, Typography } from '@mui/material';
import Image from 'next/image';
import { FormEvent, useState } from 'react';

interface IFeedback {
  feedback: { open: boolean; orderItem?: IOrderItems };
  setfeedback: React.Dispatch<React.SetStateAction<{ open: boolean; orderItem?: IOrderItems }>> | (() => void);
  order_code: string;
}

const Feedback = ({ feedback, setfeedback, order_code }: IFeedback) => {
  const { currentUser, auth } = useMyContext();
  const orderItem = feedback.orderItem as IOrderItems;
  const { catalog, catalog_slug, menu_id, cartItemId, name, image, slug } = orderItem;
  const [value, setValue] = useState<number>(5);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const feedbackData = {
        point: data.get('point') as unknown as number,
        feedback_content: data.get('content') as unknown as string,
        feedback_code: `${order_code}${cartItemId}`,
        menu_id,
        customer_id: currentUser?.id as number,
      };

      console.log({ feedbackData });
      const res = (await createNewFeedbackApi({ feedbackData, token: auth?.token as string })).data;
      console.log({ res });
    } catch (error) {}
  };

  const labels = {
    1: 'Tệ',
    2: 'Không hài lòng',
    3: 'Bình thường',
    4: 'Hài lòng',
    5: 'Tuyệt vời',
  };
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.6,
          backgroundColor: '#999',
        }}
      />
      <Box
        sx={{
          position: 'fixed',
          top: '40%',
          left: '50%',
          width: 'fit-content',
          transform: 'translate(-50%,-40%)',
          minWidth: 768,
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '6px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <Typography fontSize={'1.8rem'} fontWeight={700}>
          Đánh giá sản phẩm
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              borderRadius: '6px',
              padding: '5px',
              backgroundColor: '#00000005',
              border: '1px solid #0000000a',
              display: 'flex',
              textAlign: 'center',
              gap: '10px',
            }}
          >
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                fontSize: '1.4rem',
                gap: '10px',
              }}
            >
              <Image
                style={{ border: '1px solid #00000009' }}
                className="verifyImg"
                width="80"
                height="60"
                src={`${image}`}
                alt=""
              />
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  fontSize: '1.4rem',
                  gap: '10px',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    '& p': {
                      fontWeight: 700,
                      '& i': {
                        color: myColors.primary,
                        fontWeight: 500,
                        fontSize: '1.3rem',
                      },
                    },
                  }}
                >
                  <Button style={{ width: 'fit-content', padding: 0 }} link href={`#`} text target="_blank">
                    {name}
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                    justifyContent: 'end',
                    alignItems: 'center',
                    '& p': {
                      fontWeight: 500,
                    },
                  }}
                >
                  <Typography width={'100px'} color={'#337ab7'}>
                    Đánh giá
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                    <Rating
                      name="point"
                      value={value}
                      precision={1}
                      onChange={(event: React.SyntheticEvent, value: number | null) => {
                        if (value) setValue(value);
                      }}
                    />
                    {value !== null && (
                      <Typography
                        sx={{
                          ml: '5px',
                          width: '130px',
                          textAlign: 'left',
                          color: myColors.primary,
                        }}
                      >
                        {labels[value as 1 | 2 | 3 | 4 | 5]}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          <TextareaAutosize
            className="text-area"
            name="content"
            placeholder="Nhập đánh giá ...."
            autoFocus
            style={{
              overflow: 'scroll',
              height: '80px',
              width: '100%',
              minHeight: '80px',
              // minWidth: '100%',
              maxHeight: '80px',
              maxWidth: '100%',
              padding: '10px',
              marginTop: '10px',
            }}

            // style={{ width: '100%', height: '100px', maxHeight: '100px', padding: '10px' }}
          />

          <Box sx={{ mt: '10px', display: 'flex', justifyContent: 'end', gap: '10px' }}>
            <Button primary onClick={() => setfeedback({ open: false })} type="button">
              Bỏ qua
            </Button>
            <Button primary type="submit">
              Đánh giá
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Feedback;
