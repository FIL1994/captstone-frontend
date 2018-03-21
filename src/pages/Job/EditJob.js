import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";
import _ from "lodash";

import JobForm from "./JobForm";
import { URLS } from "../../constants";

class EditJob extends Component {
  state = {
    job: {}
  };

  componentDidMount() {
    axios
      .get(`${URLS.JOB}/${this.props.match.params.id}`)
      .then(res => this.setState({ job: res.data }))
      .catch(() => this.props.history.push("/job"));
  }

  handleSubmit = async newJob => {
    await axios.put(`${URLS.JOB}/${this.props.match.params.id}`, newJob);

    this.props.history.push("/job");
  };

  render() {
    const { job } = this.state;

    return (
      <Container>
        {!_.isEmpty(job) && (
          <JobForm edit job={job} onSubmit={this.handleSubmit} />
        )}
      </Container>
    );
  }
}

export default EditJob;
