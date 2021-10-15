import { css } from '@emotion/react';

const searchBarContainerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 30px;
  margin-bottom: 30px;
  background-color: #72c2e9;
  border: 3px solid #212529;
  border-radius: 15px;
`;

const headingStyle = css`
  font-size: 30px;
`;

const searchBarStyle = css`
  display: block;
  width: 300px;
  padding: 10px;
  background: url(/images/magnifying-glass.svg) #fff 3% 50% / 20px no-repeat;
  border: 2px solid #212529;
  border-radius: 10px;
  font-size: 20px;
  text-indent: 25px;
  &:focus {
    outline: 0;
    box-shadow: 0 0 4px 2px #72c2e9;
  }
`;

export default function SearchBar(props: {
  handleSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchInput: string;
}) {
  return (
    <div css={searchBarContainerStyle}>
      <h2 css={headingStyle}>Product List</h2>
      <input
        type="search"
        onChange={props.handleSearchInputChange}
        css={searchBarStyle}
        value={props.searchInput}
        placeholder="Search..."
      />
    </div>
  );
}
