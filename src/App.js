import { useEffect, useMemo, useState } from "react";
import { Container } from "@material-ui/core";
import axios from "axios";
import ReactTable from "./Table/ReactTable";
import Pagination from "./Table/Pagination";

function App() {
  const statusId = [1, 2, 3, 4, 5];
  const statuses = ['success', 'error', 'processing', 'cancelled', 'blocked']
  const getRandomStatus = () => {
    return statusId[Math.floor(Math.random() * statusId.length)];
  }
  const columns = useMemo(() => [
    {
      Header: 'Все страны',
      columns: [
        { Header: 'Название страны', accessor: 'name', style: { textAlign: 'right' } },
        { Header: 'Столица', accessor: 'capital' },
        { Header: 'Регион', accessor: 'region', width: 140, sortDescFirst: true },
        { Header: 'Численность населения', accessor: 'population', width: 140 },
        { Header: 'Двоичный код', accessor: 'alpha2Code', width: 100 },
        { Header: 'Троичный код', accessor: 'alpha3Code', width: 40 },
        { Header: 'Статус', accessor: 'status', width: 65 },
      ]
    }
  ], [])
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/region/europe?fields=name;capital;region;population;alpha2Code;alpha3Code').then(res => {
      let countries = res.data.map(country => ({ ...country, status: getRandomStatus() }))
      console.log('COUNTRIES ' + JSON.stringify(countries))
      setCountries(countries);
    })
  }, [])
  return (
    <Container>
      <ReactTable
        columnOrderName={'name'}
        rowPerPageOptions={[50, 100, 200, 250]}
        pagination
        getRowProps={(row) => {
          console.log(row);
          row.status = statuses[row.original.status - 1]
        }}
        columns={columns}
        data={countries}
      />
    </Container>

  );
}

export default App;
