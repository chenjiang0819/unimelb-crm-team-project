import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { FormControl, InputGroup } from "react-bootstrap";
import MediaQuery from "react-responsive";
import PropTypes from "prop-types";

const SearchBox = styled(InputGroup)`
  background-color: transparent;
  height: 2rem;
  outline: none;
  border-radius: 0px;
  color: var(--color-headings);
`;

const SearchEntry = styled(FormControl)`
  font-size: 1rem;
  background-color: transparent;
  border: 0px;
  border-radius: 0px;
  border-bottom: 1px solid var(--color-primary);
  &:focus {
    border-bottom: 1px solid var(--color-primary);
  }
  @media (min-width: 1024px) {
    font-size: 1.1rem;
  }
`;

const SearchBoxIcon = styled(InputGroup.Text)`
  font-size: 1.1rem;
  background-color: transparent;
  border: 0px;
  border-radius: 0px;
  border-bottom: 1px solid var(--color-primary);
`;

const SearchBoxButton = styled(SearchBoxIcon)`
  &:hover {
    // background-color: var(--color-border);
    filter: brightness(75%);
  }
`;

const SearchBar = ({ onSearchEntry, onFilterClick }) => (
  <SearchBox>
    <SearchBoxIcon>
      <FontAwesomeIcon icon="search" size="lg" color="var(--color-primary)" />
    </SearchBoxIcon>
    <SearchEntry className="shadow-none" placeholder="Search" onChange={(e) => onSearchEntry(e.target.value)} />
    <SearchBoxButton as="button" onClick={onFilterClick} aria-controls="filterMenu">
      <FontAwesomeIcon icon="filter" size="lg" color="var(--color-primary)" />
      <MediaQuery minWidth={768}>&nbsp;Filter</MediaQuery>
    </SearchBoxButton>
  </SearchBox>
);

SearchBar.propTypes = {
  onSearchEntry: PropTypes.func.isRequired,
  onFilterClick: PropTypes.func.isRequired,
};

export default SearchBar;
