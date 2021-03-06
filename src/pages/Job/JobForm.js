import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";
import axios from "helpers/axios";
import _ from "lodash";
import Select from "react-virtualized-select";
import moment from "moment";

import DatePicker from "components/DatePicker";
import { URLS } from "../../constants";

class JobForm extends Component {
  state = {
    dateOpened: "",
    description: "",
    ..._.pickBy(this.props.job, _.identity),
    projects: [],
    employees: [],
    selectedProject: "",
    selectedEmployees: []
  };

  componentDidMount() {
    axios.get(URLS.PROJECT).then(res =>
      this.setState({
        projects: res.data.map(p => ({
          label: p.description,
          value: p.id
        }))
      })
    );

    axios.get(URLS.EMPLOYEE).then(res =>
      this.setState({
        employees: res.data.map(e => ({
          label: `${e.firstName} ${e.lastName}`,
          value: e.id
        }))
      })
    );
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = async e => {
    e.preventDefault();

    const {
      dateOpened,
      description,
      selectedProject,
      selectedEmployees
    } = this.state;

    console.log("submit job", this.state);

    this.props.onSubmit({
      dateOpened,
      description,
      project: {
        id: selectedProject.value
      },
      employees: selectedEmployees.map(e => ({ id: e.value }))
    });
  };

  render() {
    const { dateOpened, description } = this.state;

    console.log("Job Form", this.state, this.props);

    return (
      <form onSubmit={this.handleSubmit}>
        <label>Project</label>
        <Select
          options={this.state.projects}
          onChange={selectedProject => this.setState({ selectedProject })}
          value={this.state.selectedProject}
          placeholder="select project"
          style={{ marginBottom: 20 }}
        />
        <Form.Input
          fluid
          label="Description"
          name="description"
          value={description}
          onChange={this.handleChange}
          style={{ marginBottom: 20 }}
        />
        <div className="field" style={{ marginBottom: 20 }}>
          <label>Date Opened</label>
          <DatePicker
            onDateChange={date =>
              date && this.setState({ dateOpened: date.format() })
            }
            initialDate={moment(dateOpened)}
          />
        </div>
        <label>Employee(s)</label>
        <Select
          multi
          options={this.state.employees}
          onChange={selectedEmployees => this.setState({ selectedEmployees })}
          value={this.state.selectedEmployees}
          placeholder="select employee(s)"
          style={{ marginBottom: 20 }}
        />
        <Button primary type="submit">
          {this.props.edit ? "Edit Job" : "Create Job"}
        </Button>
      </form>
    );
  }
}

JobForm.propTypes = {
  edit: PropTypes.bool,
  customer: PropTypes.object,
  onSubmit: PropTypes.func
};

JobForm.defaultProps = {
  edit: false,
  customer: {},
  onSubmit: _.noop
};

export default JobForm;
