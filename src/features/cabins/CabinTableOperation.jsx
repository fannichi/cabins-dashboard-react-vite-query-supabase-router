import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';

function CabinTableOperation() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: 'all', label: 'all' },
          { value: 'no-discount', label: 'No discount' },
          { value: 'with-discount', label: 'With discount' },
        ]}
      />
      <SortBy
        options={[
          { value: 'name-asc', label: 'by name (A-Z)' },
          { value: 'name-desc', label: 'by name (Z-A)' },
          { value: 'regularPrice-asc', label: 'by price (lowest first)' },
          { value: 'regularPrice-desc', label: 'by price (highest first)' },
          { value: 'maxCapacity-asc', label: 'by capacity (lowest first)' },
          { value: 'maxCapacity-desc', label: 'by capacity (highest first)' },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperation;
