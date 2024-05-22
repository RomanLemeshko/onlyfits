import { memo, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './dropDownFilterComponent.css';
import { useSearchParams } from 'react-router-dom';

const DropdownMenu = ({
  styleName,
  listOfOptions,
  setProgramFilter,
  initialMenuMessage,
}) => {
  const dropdownRef = useRef(null);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    initialMenuMessage ? initialMenuMessage : null
  );

  function toggleMenuHandler() {
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

  return (
    <div className='daddy'>
      <div className={`dropdown-container-${styleName}`}>
        <div className="dropdown-arrow-items" ref={dropdownRef}>
          <div className="selected-arrow" onClick={toggleMenuHandler} name={`${styleName}-selected`}>
            <div className='default-pick drop-text'>{selectedOption}</div>
            <img
              className={`dropdown-arrow ${isMenuActive ? 'open' : ''}`}
              src={`${'\\dropdown_arrow\\icons8-dropdown-arrow-48.png'}`}
              alt="arrow"
            />
          </div>
          <ul className={`dropdown__options ${isMenuActive ? 'open' : ''}`}>
            {listOfOptions.map((element) => (
              <li
                key={uuidv4()}
                id={element.id}
                className={`dropdown-${styleName}__item items drop-text`}
                onClick={() => {
                  setSelectedOption(element.name);
                  setIsMenuActive(false);
                  setProgramFilter(element.name);
                }}
              >
                <div className='drop-text'>{element.name}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default memo(DropdownMenu);
