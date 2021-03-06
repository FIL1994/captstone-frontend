import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import axios from "helpers/axios";

import { URLS } from "constants/index";
import CustomerForm from "./CustomerForm";

class CreateCustomer extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = async newCustomer => {
    await axios.post(URLS.CUSTOMER, newCustomer);

    this.props.history.push("/customer");
  };

  render() {
    return (
      <Container>
        <CustomerForm onSubmit={this.handleSubmit} />
      </Container>
    );
  }
}

export default CreateCustomer;
