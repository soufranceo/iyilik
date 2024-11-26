import { useStore } from '@/lib/store';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

export function DeedsList() {
  const { deeds, deleteDeed } = useStore();

  const handleDeleteDeed = async (id: string) => {
    if (window.confirm('Bu iyi işi silmek istediğinizden emin misiniz?')) {
      deleteDeed(id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead className="w-[80px]">No</TableHead>
            <TableHead>Başlık</TableHead>
            <TableHead>Yazar</TableHead>
            <TableHead>Tarih</TableHead>
            <TableHead className="text-right">İşlemler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deeds.map((deed) => (
            <TableRow key={deed.id}>
              <TableCell className="font-mono text-xs">
                {deed.id.slice(0, 8)}...
              </TableCell>
              <TableCell>#{deed.numericId}</TableCell>
              <TableCell>{deed.title}</TableCell>
              <TableCell>{deed.isAnonymous ? 'Anonim' : deed.author}</TableCell>
              <TableCell>
                {new Date(deed.date).toLocaleDateString('tr-TR')}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteDeed(deed.id)}
                >
                  Sil
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {deeds.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-4 text-muted-foreground"
              >
                Henüz hiç iyi iş paylaşılmamış
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}