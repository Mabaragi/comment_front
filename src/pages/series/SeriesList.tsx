import { Link } from 'react-router-dom';
import type { Series } from '../../types/series';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Props = { series: Series[] };

export default function SeriesList({ series }: Props) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {series.map((item: Series) => (
          <Link to={`/main/series/${item.id}`} key={item.id}>
            <Card className="overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-lg h-full flex flex-col">
              <CardHeader className="p-0">
                <img
                  src={item.image_src}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                <CardTitle className="text-lg font-bold">
                  {item.title}
                </CardTitle>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
