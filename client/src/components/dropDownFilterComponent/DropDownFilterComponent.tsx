// import triangle from "./Triangle.svg";

import { memo, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './dropDownFilterComponent.css';
import { useSearchParams } from 'react-router-dom';

const DropdownMenu = ({
  styleName, //! styles
  label, //! lable name
  listOfOptions, //! dropdown options
  setProgramFilter,
  //   selectOptionClick,
  //   stateProperty,
  //   currentRequest,
  initialMenuMessage, //! initial picked
  //   isValidKey,
  // optionsLoader,
  //   dropdownDescription,
  // helper,
}) => {
  const dropdownRef = useRef(null);
  //   const [searchParams] = useSearchParams();
  //   const queryString = searchParams.get("id");

  const [isMenuActive, setIsMenuActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    initialMenuMessage ? initialMenuMessage : null
  );

  function toggleMenuHandler(e) {
    setIsMenuActive(!isMenuActive);
  }

  function clickOutside(e) {
    if (!dropdownRef.current.contains(e.target)) {
      setIsMenuActive(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', clickOutside);
    return () => document.removeEventListener('mousedown', clickOutside);
  }, []);

  console.log('DROPDOWN: ', isMenuActive);

  return (
    <div className='daddy'>
      <div className={`dropdown-container-${styleName}`}>
        <label className="filter-label" htmlFor={`${styleName}-selected`}>
          {label}
        </label>
        <div className="dropdown-arrow-items" 
        ref={dropdownRef}>
          {/*CONTAINER*/}
          <div
            className="selected-arrow"
            onClick={toggleMenuHandler}
            name={`${styleName}-selected`}
          >
            {/* <div className="dropdown-selects-selected">
              {selectedOption}
            </div> */}
            <div className='dropdown__select__arrow'>
              <img
                className="dropdown-arrow"
                src={`${'\\dropdown_arrow\\icons8-dropdown-arrow-48.png'}`}
                alt="arrow"
              />
            </div>
          </div>
          <ul
            className={`dropdown__options `}
          > {!isMenuActive ? (<li className='default-pick'>{selectedOption}</li>): (<li></li>)}
            {isMenuActive ? (
              <ul className={`dropdown-list`}>
                {listOfOptions.map((element) => (
                  <li
                    key={uuidv4()}
                    id={element.id}
                    className={`dropdown-${styleName}__item items`}
                    onClick={(event) => {
                      setSelectedOption(element.name);
                      setIsMenuActive(false);
                      setProgramFilter(element.name);
                    }}
                  >
                    <div >{element.name}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <></>
            )}
          </ul>
        </div>
       
      </div>
    </div>
  );
};

export default memo(DropdownMenu);
