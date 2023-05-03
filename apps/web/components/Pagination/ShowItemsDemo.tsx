import styled from "styled-components";

function Items({ currentItems }: { currentItems: number[] }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div key={item}>
            <h3>Item #{item}</h3>
          </div>
        ))}
    </>
  );
}

export function ShowItemsDemo({
  itemsPerPage,
  data,
  currentPage,
}: {
  itemsPerPage: number;
  data: number[];
  currentPage: number;
}) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.

  const newOffset = (currentPage * itemsPerPage) % data.length;

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = newOffset + itemsPerPage;
  const currentItems = data.slice(newOffset, endOffset);

  // Invoke when user click to request another page.

  return (
    <StyledItems>
      <Items currentItems={currentItems} />
    </StyledItems>
  );
}

const StyledItems = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
  width: 100%;
  overflow: scroll;
  overflow-x: hidden;
  background-color: darkseagreen;
  flex-wrap: wrap;
  filter: drop-shadow(0 0 0.25rem gray);
  h3 {
    padding: 8px;
  }
`;
