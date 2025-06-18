import { Link } from 'react-router-dom';
import HeaderActionButtons from '../../components/HeaderActionButtons';
import type { Series } from '../../types/series';

type Props = { series: Series[] };

export default function SeriesList({ series }: Props) {
  return (
    <>
      <HeaderActionButtons />
      <ul className="flex justify-center flex-wrap gap-6">
        {series.map((item: Series) => (
          <Link
            to={`/main/series/${item.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:-translate-y-1 hover:shadow-lg cursor-pointer"
            key={item.id}
          >
            <h3 className="text-center">{item.title}</h3>
            <img src={item.image_src} alt="" className="" />
          </Link>
        ))}
      </ul>
    </>
  );
}
