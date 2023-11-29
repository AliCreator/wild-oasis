import { toast } from "react-hot-toast";
import { useCabins } from "./useCabins";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

export default function CabinTable() {
  const { isLoading, cabins, error } = useCabins();
const [searchParams] = useSearchParams()


  if (isLoading) return <Spinner />;
  if (error) return toast.error(error.message);

  const filteredValue = searchParams.get('discount') || 'all'
  const currentSort = searchParams.get("sortBy") || "name-asc"


  let filteredCabins; 
  if(filteredValue === 'all') filteredCabins = cabins; 
  if(filteredValue === 'no-discount') filteredCabins = cabins.filter(cabin => cabin.discount ===0)
  if(filteredValue === 'with-discount') filteredCabins = cabins.filter(cabin => cabin.discount > 0)

  const [field, dir] = currentSort.split("-")
  const modifier = dir === "asc" ? 1 : -1
  const finalData = filteredCabins.sort((a,b) => (a[field] - b[field]) * modifier)

  return (
    <>
      <Menus>
        <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
          <Table.Header role="table">
            <div></div>
            <div>Cabin</div>
            <div>Capacity</div>
            <div>Price</div>
            <div>Discount</div>
          </Table.Header>
          <Table.Body
            data={finalData}
            render={(cab) => <CabinRow cabin={cab} key={cab.id} />}
          />
        </Table>
      </Menus>
    </>
  );
}
