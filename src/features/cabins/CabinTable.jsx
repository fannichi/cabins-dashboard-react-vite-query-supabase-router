import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';
import Empty from '../../ui/Empty';

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resource="cabins" />;

  // Filtering
  const filterValue = searchParams.get('discount') || 'all';
  const filteredCabins =
    filterValue === 'with-discount'
      ? cabins.filter(cabin => cabin.discount > 0)
      : filterValue === 'no-discount'
      ? cabins.filter(cabin => cabin.discount === 0)
      : cabins;

  // Sorting:
  const sortBy = searchParams.get('sortBy') || 'name-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;

  const sortedCabins = filteredCabins.sort((a, b) => {
    if ((typeof a[field] === 'string' && typeof a[field]) === 'string') {
      return a[field].localeCompare(b[field]) * modifier;
    }
    return (a[field] - b[field]) * modifier;
  });

  return (
    <Menus>
      <Table columns=" 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={cabin => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
