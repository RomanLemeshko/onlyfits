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
    <>
      <div className={`dropdown-${styleName}-container`}>
        <label
          className={`dropdown-${styleName}__label`}
          htmlFor={`${styleName}-selected`}
        >
          {label}
        </label>
        <div
          className={`dropdown-${styleName}`}
          ref={dropdownRef}
        >
          {/*CONTAINER*/}
          <div
            className="class"
            onClick={toggleMenuHandler}
            name={`${styleName}-selected`}
          >
            <div className={`dropdown-${styleName}__select__selected`}>
              {
                                 selectedOption
                            }
            </div>
            <div className={`dropdown-${styleName}__select__arrow`}>
              <img
                className={`dropdown-${styleName}__select__arrow-${
                  isMenuActive ? 'up' : 'down'
                }`}
                src={`${'\\dropdown_arrow\\icons8-dropdown-arrow-48.png'}`}
                alt="arrow"
              />
            </div>
          </div>
          <ul
            className={`dropdown-${styleName}__options-${
              isMenuActive ? 'active' : 'hidden'
            }`}
          >
            {isMenuActive ? (
              <ul className={`dropdown-${styleName}__list`}>
                {listOfOptions.map((element) => (
                  <li
                    key={uuidv4()}
                    id={element.id}
                    className={`dropdown-${styleName}__item`}
                    onClick={(event) => {
                      setSelectedOption(element.name);
                      setIsMenuActive(false);
                      setProgramFilter(element.name)
                    //   if (selectOptionClick) {
                    //     selectOptionClick(event, element, stateProperty);
                    //   }
                    }}
                  >
                    <div className={`dropdown-${styleName}__item__text`}>
                      {element.name}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <></>
            )}
          </ul>
        </div>
        {/* {dropdownDescription ? (
          <div className={`dropdown-${styleName}__description`}>
            {dropdownDescription}
          </div>
        ) : null} */}
        {/*typeof isValidKey !== 'undefined'*/}
        {/* {isValidKey === false ? (
          <div className={`dropdown-${styleName}__item__underline`}>
            Обязательное поле
          </div>
        ) : null} */}
        {/* {
                    helper  &&
                    (
                        <p
                            className={`dropdown-${styleName}-comment__underline`}>
                            {helper}
                        </p>
                    )
                } */}
      </div>
    </>
  );
};

export default memo(DropdownMenu);
