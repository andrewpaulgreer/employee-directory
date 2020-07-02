import React, { Component } from "react";
import user from "../lib/user.json";
import Card from "./Card.js";

export default class Table extends Component {
  state = {
    original: [],
    current: [],
    sortDirection: 1
  };
  componentDidMount() {
    this.setState({
      original: user,
      current: user
    });
  }

  
// do sorting here
onSortChange = ()=> {
  if (this.state.sortDirection === 1) {
    this.setState({ sortDirection: -1 });
  } else {
    this.setState({ sortDirection: 1 });
  }
}
    
  
    
  handleSearches = term => {
    const updatedList = this.state.original.filter(
      user =>
        user.name.first.toLowerCase().includes(term.toLowerCase()) ||
        user.name.last.toLowerCase().includes(term.toLowerCase())
       );
      this.setState({
          current: updatedList
      })
      console.log(updatedList)
  };
  render() {
   

    const sorted = this.state.current.sort((a, b) => {
      if (this.state.sortDirection === 1) {
        return a.name.first > b.name.first ? 1 : -1
      } else {
        return a.name.first < b.name.first ? 1 : -1
      }
    });

    return (
      <>
      <div>
        <h1 className="title"><strong>User Directory</strong></h1>
      </div>
        <input 
         type="text" className="form-control search" aria-label="Large"
         placeholder="Search"
        onChange={event => this.handleSearches(event.target.value)} />
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">number</th>
              <th scope="col"><button type="button" onClick={this.onSortChange}>First Name</button></th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Cell Phone</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((user, index) => (
              <Card User={user} index={index} key={user.id.value} />
            ))}
          </tbody>
        </table>
      </>
    );
  }
}
