import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Divider } from "semantic-ui-react";
import { withConsumer } from "components/Context";

class Home extends Component {
  render() {
    return (
      <Container>
        <h1>Home - {this.props.context.state.userDetails.username}</h1>
        <Divider />
        <Button.Group>
          <Button as={Link} to="/customer" color="teal">
            Customer
          </Button>
          <Button as={Link} to="/employee" color="teal">
            Employee
          </Button>
          <Button as={Link} to="/project" color="teal">
            Project
          </Button>
          <Button as={Link} to="/job" color="teal">
            Job
          </Button>
          <Button as={Link} to="/jobhours" color="teal">
            Job Hours
          </Button>
        </Button.Group>
      </Container>
    );
  }
}

export default withConsumer(Home);
