import { useStore } from '@/lib/store';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function ActivityList() {
  const { activities, deeds } = useStore();

  const formatNetworkInfo = (activity: typeof activities[0]) => {
    if (!activity.connection) return 'Bilinmiyor';
    
    const effectiveType = activity.connection.effectiveType || 'unknown';
    const downlink = activity.connection.downlink || 0;
    const rtt = activity.connection.rtt || 0;

    return (
      <>
        {activity.networkType} ({effectiveType})
        <br />
        <span className="text-xs text-muted-foreground">
          {downlink}Mbps, RTT: {rtt}ms
        </span>
      </>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tarih</TableHead>
            <TableHead>Sayfa</TableHead>
            <TableHead>Cihaz</TableHead>
            <TableHead>Ağ</TableHead>
            <TableHead>Konum</TableHead>
            <TableHead>İlgili İş</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity) => (
            <TableRow key={activity.id}>
              <TableCell>
                {new Date(activity.timestamp).toLocaleString('tr-TR')}
              </TableCell>
              <TableCell>{activity.path}</TableCell>
              <TableCell>{activity.deviceModel}</TableCell>
              <TableCell>{formatNetworkInfo(activity)}</TableCell>
              <TableCell>{activity.location || 'Bilinmiyor'}</TableCell>
              <TableCell>
                {activity.relatedDeedId
                  ? `#${
                      deeds.find((d) => d.id === activity.relatedDeedId)
                        ?.numericId || 'Silinmiş'
                    }`
                  : '-'}
              </TableCell>
            </TableRow>
          ))}
          {activities.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-4 text-muted-foreground"
              >
                Henüz hiç aktivite kaydı yok
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}