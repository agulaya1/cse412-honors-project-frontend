import React, { useEffect, useState } from 'react';
import '../App.css';

interface searchProps {
  text: string;
  toggleCustomers: boolean;
}

interface ITopCustomers {
  first_name: string;
  last_name: string;
  total_spent: string;
}

const TopCustomers: React.FC<searchProps> = (result): JSX.Element => {

  const [topCustomers, setTopCustomers] = useState<ITopCustomers[]>([]);
  const [toggleCustomers, setToggleCustomers] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/customers/top=${result.text}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then((response) => response.json())
      .then((actualData) => {
        setTopCustomers(actualData);
        console.log(actualData);
      })

  }, [])

  return (
    <>
      {result.toggleCustomers ?
        topCustomers ?
          topCustomers.map((item, i) => (
            <div className="top-customers" key={i}>
              <div className="top-customers-name">
                <p>{item.first_name} {item.last_name}</p>
              </div>
              <>
                <p>total spent: ${item.total_spent}</p>
              </>
            </div>
          ))
          : <></>
        : <></>
      }
    </>
  );
}

export default TopCustomers;
