import Button from '@/components/Button/Button';
import { useMyContext } from '@/context/context';
import { Box, Typography } from '@mui/material';
import ReceiverUpdate from './ReceiverUpdate';
import { IReceiver } from './page';
// import ReceiverUpdate from './ReceiverUpdate';

const Receiver = ({ updateModel, setUpdateModel, receiver, setReceiver }: IReceiver) => {
  const { currentUser, orderItems } = useMyContext();
  return (
    <>
      <Typography fontWeight={700}>NGƯỜI NHẬN</Typography>{' '}
      <Box sx={{ display: 'flex', gap: '30px' }}>
        <Typography fontWeight={500}>Tên: {receiver.name}</Typography>
        <Typography fontWeight={500}>Số điện thoại: {receiver.phoneNumber}</Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <Typography fontWeight={500}> Địa chỉ: </Typography>
        {currentUser?.address ? (
          <>
            <Typography fontWeight={500}>{currentUser.address}</Typography>
            <Button
              link
              style={{ fontWeight: 700, padding: 0, fontSize: '1.4rem' }}
              onClick={() => setUpdateModel({ orderer: true })}
            >
              Thay đổi
            </Button>
          </>
        ) : (
          <Button
            link
            style={{ fontWeight: 700, padding: 0, fontSize: '1.4rem' }}
            onClick={() => setUpdateModel({ orderer: true })}
          >
            Cập nhật
          </Button>
        )}
      </Box>
      {(updateModel.orderer || updateModel.receiver) && (
        <ReceiverUpdate
          receiver={receiver}
          updateModel={updateModel}
          setUpdateModel={setUpdateModel}
          setReceiver={setReceiver}
        />
      )}
    </>
  );
};

export default Receiver;
