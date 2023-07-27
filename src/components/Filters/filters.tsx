import React from "react";
import { FilterContent, Title, Dropdown } from "./filters.styles.ts";

export const Filters = ( { filterName, items, handleFilterSelect } ) => {

  return(
    <FilterContent>
      <Title>{filterName}:</Title>
      <Dropdown onChange={(e) => handleFilterSelect(e.target.value)}>
        <option value="all">All</option>
        {items.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </Dropdown>
    </FilterContent>
  )
}