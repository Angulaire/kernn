import React from 'react'
import Router from 'next/router'
import { Row, Col, Button } from 'antd';
import styled from 'styled-components'
import { ReactiveBase, DataSearch, ReactiveList, MultiDropdownList } from '@appbaseio/reactivesearch';

const SearchGroup = styled.div`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  background: white;
  padding: 20px;
  margin-top: -50px;
  position: absolute;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 5px 10px;
  left: 5%;
  width: 90%;

  @media (min-width: 768px) { 
    left: 20%;
    width: 60%;
  }

  .block {
    width: 100%;
  }
`

class SearchHome extends React.Component{

  state = {
    search: "",
    location: []
  };

  handleSubmit() {
    Router.push({
      pathname: '/jobs', 
      query: { search: this.state.search, location: this.state.location }
    })
  }

  render() {
    return (
      <ReactiveBase
        app={process.env.APPBASE_APP_ID}
        credentials={process.env.APPBASE_API_KEY}
      >
        <SearchGroup>
          <DataSearch
            componentId="search"
            dataField={["title"]}
            queryFormat="and"
            placeholder="Intitulé ou mots-clés..."
            className="block"
            showIcon={false}
            showClear
            autosuggest={false}
            onValueChange={(value) => {
              this.setState({
                search: value
              });
            }}
            onValueSelected={this.handleSubmit.bind(this)} 
          />
          <MultiDropdownList
            componentId="locationTown"
            dataField="location_town.keyword"
            placeholder="Lieu"
            showSearch
            searchPlaceholder="Votre ville..."
            className="block"
            onValueChange={(value) => {
              this.setState({
                location: value
              });
            }}
          />
          <Button type="primary" size="large" onClick={this.handleSubmit.bind(this)} style={{marginLeft: "12px"}}>Rechercher</Button>
        </SearchGroup>
      </ReactiveBase>
    )
  }
}

export default SearchHome