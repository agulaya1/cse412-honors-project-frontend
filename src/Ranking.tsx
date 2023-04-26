import React, { useEffect, useState } from 'react';
import './App.css';
import * as BiIcons from "react-icons/bi";
import * as IoIcons from "react-icons/io";
import TopCustomers from './components/TopCustomers';
import TopGroups from './components/TopGroups';

interface ITopCustomerGroups {
  first_name: string;
  last_name: string;
  num_groups: string;
}

function Ranking() {
  const [toggleCustomers, setToggleCustomers] = useState(false);
  const [toggleGroups, setToggleGroups] = useState(false);

  const [topCustomerGroups, setTopCustomerGroups] = useState<ITopCustomerGroups[]>([]);
  const [toggleCustomerGroups, setToggleCustomerGroups] = useState(false);

  const [months, setMonths] = useState('1');
  const [searchKey, setSearchKey] = React.useState(0);

  useEffect(() => {
    document.title = "Store Page Store - rankings"

    fetch(`http://localhost:8000/customers/top/group`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then((response) => response.json())
      .then((actualData) => {
        setTopCustomerGroups(actualData);
        console.log(actualData);
      })
  }, [])

  const refreshTopCustomers = () => {
    setToggleCustomers(!toggleCustomers);
    refreshKey();
  }

  const refreshTopGroups = () => {
    setToggleGroups(!toggleGroups);
    refreshKey();
  }

  const sendToTopComponents = () => {
    refreshKey();
  }

  const refreshTopCustomerGroups = () => {
    setToggleCustomerGroups(!toggleCustomerGroups);
    refreshKey();
  }

  const refreshKey = () => {
    setSearchKey(key => key + 1);
  }

  return (
    <div id="wrapper">
      <nav className="navbar">
        <a href="/">
          <div className="site-name">
            <h2>Store Page Store</h2>
          </div>
        </a>
        <a href="/ranking">
          rankings
        </a>
      </nav>
      <main>
        <p>click the dropdown menus:</p>
        <div className="dropdown-months">
          <p>from the last
            <span>
              <input id="number" type="number" defaultValue="1" min="1" max="12" onKeyDown={function (e) {return false}} onChange={function (e) { setMonths(e.target.value); sendToTopComponents() }} />
            </span>
            months (up to 1 year)
          </p>
        </div>
        <div className="dropdown">
          <div className="dropdown-desc">
            <button type="button" className="store-button" onClick={() => refreshTopCustomers()}>Our top five customers</button>
            {toggleCustomers ? (
              <IoIcons.IoMdArrowDropdown />
            ) : (
              <IoIcons.IoMdArrowDropright />
            )}
          </div>
          <TopCustomers text={months} toggleCustomers={toggleCustomers} key={searchKey} />
        </div>
        <div className="dropdown">
          <div className="dropdown-desc">
            <button type="button" className="store-button" onClick={() => refreshTopGroups()}>Our top three item groups</button>
            {toggleGroups ? (
              <IoIcons.IoMdArrowDropdown />
            ) : (
              <IoIcons.IoMdArrowDropright />
            )}
          </div>
          <TopGroups text={months} toggleGroups={toggleGroups} key={searchKey} />
        </div>
        <div className="dropdown">
          <div className="dropdown-desc">
            <button type="button" className="store-button" onClick={() => refreshTopCustomerGroups()}>Top customers who have ordered from the same categories in all time</button>
            {toggleCustomerGroups ? (
              <IoIcons.IoMdArrowDropdown />
            ) : (
              <IoIcons.IoMdArrowDropright />
            )}
          </div>
          {toggleCustomerGroups ?
            topCustomerGroups ?
              topCustomerGroups.map((item, i) => (
                <div className="top-customers" key={i}>
                  <div className="top-customers-name">
                    <p>{item.first_name} {item.last_name}</p>
                  </div>
                  <>
                    <p>orders from same category: {item.num_groups}</p>
                  </>
                </div>
              ))
              : <></>
            : <></>}
        </div>
      </main>
    </div>
  );
}

export default Ranking;
