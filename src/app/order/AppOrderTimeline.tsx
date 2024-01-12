// @mui
import { IUser } from '@/interface/interface';
import dateTimeFormate from '@/utils/dateTimeFormate';
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab';
import { Card, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';
// utils

// ----------------------------------------------------------------------

interface IAppOrderTimeline {
  handler?: IUser | null;
  deliver?: IUser | null;
  list: {
    time: string | null;
    status: string;
    stt_code: number;
  }[];
}

interface IOrderItem {
  isLast: boolean;
  item: { time: string | null; status: string };
  type: string;
  handler?: IUser | null;
  deliver?: IUser | null;
}

export default function AppOrderTimeline({ deliver, handler, list }: IAppOrderTimeline) {
  return (
    <Card
      sx={{
        boxShadow: 'none',
        backgroundColor: 'transparent',
      }}
    >
      <CardContent
        sx={{
          padding: '0 10px 0 10px',
          boxShadow: 'none',
          '& .MuiTimelineItem-missingOppositeContent:before': {
            display: 'none',
          },
          '&:last-child': { paddingBottom: 0 },
        }}
      >
        <Timeline>
          {list?.map((item, index) => {
            if (item.stt_code === 2)
              return (
                <OrderItem
                  key={index}
                  handler={handler}
                  item={item}
                  type={`order${index + 1}`}
                  isLast={index === list.length - 1}
                />
              );
            if (item.stt_code === 3)
              return (
                <OrderItem
                  key={index}
                  deliver={deliver}
                  item={item}
                  type={`order${index + 1}`}
                  isLast={index === list.length - 1}
                />
              );
            return <OrderItem key={index} item={item} type={`order${index + 1}`} isLast={index === list.length - 1} />;
          })}
        </Timeline>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

function OrderItem({ item, isLast, type, handler, deliver }: IOrderItem) {
  const { status, time } = item;
  const color = time
    ? (type === 'order1' && 'success') ||
      (type === 'order2' && 'info') ||
      (type === 'order3' && 'info') ||
      (type === 'order4' && 'warning') ||
      'error'
    : 'primary';
  return (
    <TimelineItem sx={{ opacity: time ? 1 : 0.3, listStyle: 'none', minHeight: '40px' }}>
      <TimelineSeparator>
        <TimelineDot color={color} />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent sx={{ padding: '7px 16px' }}>
        <Typography sx={{ fontWeight: 700 }}>{status}</Typography>
        <Typography sx={{ color: 'grey', fontSize: '1.4rem' }}>
          <i>
            {time ? dateTimeFormate(time) : '........'}
            {handler && ` - Người xác nhận: ${handler.name}`}
            {deliver && ` - Người giao hàng: ${deliver.name}`}
          </i>
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}
