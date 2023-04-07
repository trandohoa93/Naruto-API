import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUniqueValues } from "../../utils/helpers";
import { selectInput } from "../../features/search/searchSlice";
import { useLocation, useNavigate } from "react-router-dom";

const SelectInput = () => {
  // URL
  // eslint-disable-next-line no-unused-vars
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [villageParams] = useState(new URLSearchParams(location.search));
  const [valueSelect, setValueSelect] = useState(
    villageParams.get("village") || "all"
  );

  const ListPokemons = useSelector((state) => state.search.ListPokemons);
  const village = getUniqueValues(ListPokemons, "Afiliação");
  useEffect(() => {
    dispatch(selectInput(valueSelect));
  }, []);
  const handleSelect = (event) => {
    dispatch(selectInput(event.target.value));
    setValueSelect(event.target.value);
    villageParams.set("village", event.target.value);
    navigate(`?${villageParams.toString()}`);
  };

  return (
    <div className="pl-20 pr-20 max-w-xl">
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        Select Village
      </label>
      <select
        value={valueSelect}
        onChange={handleSelect}
        id="countries"
        className="w-1/6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {village.map((item) => {
          return (
            <option value={item} key={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default SelectInput;
