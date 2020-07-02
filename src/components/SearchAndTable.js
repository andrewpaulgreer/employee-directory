import React, { Component } from "react";
import user from "../lib/user.json";
import Card from "./Card.js";

//creating a table class that extends from the component, will also handle searches
export default class SearchAndTable extends Component {
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
    // handling the searches
  handleSearches = term => {
    const updatedList = this.state.original.filter(
      user =>
      // giving the user.name.first to lowercase to bee seen
        user.name.first.toLowerCase().includes(term.toLowerCase()) ||
        user.name.last.toLowerCase().includes(term.toLowerCase())
       );
      this.setState({
        // setting the state of current to the updated list that was filtered
          current: updatedList
      })
      console.log(updatedList)
  };
  render() {
   
    // sort based off of the above criteria. feedin a and b into a ternary
    const sorted = this.state.current.sort((a, b) => {
      if (this.state.sortDirection === 1) {
        return a.name.first > b.name.first ? 1 : -1
      } else {
        return a.name.first < b.name.first ? 1 : -1
      }
    });
    // return html for the table
    return (
      <>
      <div>
        <h1 className="title"><strong>User Directory</strong></h1>
      </div>
      {/* handle searches in input */}
        <input 
         type="text" className="form-control search" aria-label="Large"
         placeholder="Search"
        onChange={event => this.handleSearches(event.target.value)} />
        <wrapper className="table-wrapper">
        <table className="table table-striped table-dark
        ">
          <thead>
            <tr>
              <th scope="col">number</th>
              {/* handle button click on first name */}
              <th scope="col"><button type="button" onClick={this.onSortChange}>First Name</button></th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Cell Phone</th>
            </tr>
          </thead>
          <tbody>
            {/* generate card for users to be displayed */}
            {sorted.map((user, index) => (
              <Card User={user} index={index} key={user.id.value} />
            ))}
          </tbody>
        </table>
        </wrapper>
      </>
    );
  }
}
