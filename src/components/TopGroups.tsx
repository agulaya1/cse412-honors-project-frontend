import React, { useEffect, useState } from 'react';
import '../App.css';

interface searchProps {
  text: string;
  toggleGroups: boolean;
}

interface ITopGroups {
  group_name: string;
  total_revenue: string;
}

const TopCustomers: React.FC<searchProps> = (result): JSX.Element => {

  const [topGroups, setTopGroups] = useState<ITopGroups[]>([]);

  useEffect(() => {
    fetch(`http://localhost:8000/groups/top=${result.text}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then((response) => response.json())
      .then((actualData) => {
        setTopGroups(actualData);
        console.log(actualData);
      })

  }, [])

  return (
    <>
      {result.toggleGroups ?
        topGroups ?
          topGroups.map((item, i) => (
            <div className="top-customers" key={i}>
              <div className="top-customers-name">
                <p>{item.group_name}</p>
              </div>
              <>
                <p>total revenue: ${item.total_revenue}</p>
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
