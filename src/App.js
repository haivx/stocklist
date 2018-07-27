import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import update from 'immutability-helper';
import Chance from 'chance';

// Create new instance of Chane: Using to create new company's name randomly
const chance = new Chance();
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }} >
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tab: {
    backgroundColor: 'green'
  },
  title: {
    position: 'relative',
    top: "2em",
    paddingLeft: "1em"
  }
});

class SimpleTabs extends React.Component {
  constructor(props) {
    super(props);
    let companies = [];
    [...Array(30)].map((x, i) =>
      companies.push(
        {
          id: i + 1,
          price: parseFloat((Math.random() * (99.99 - 0.01) + 0.01).toFixed(2)),
          originPrice: parseFloat((Math.random() * (99.99 - 0.01) + 0.01).toFixed(2)),
          volume: _.random(1000, 1000000),
          name: (Math.random().toString(36).substring(7)).toUpperCase(),
          company: (chance.company()).toUpperCase(),
        }
      )
    );
    companies.map(item => {
      item['totalValue'] = parseInt(Math.round(item.price * item.volume).toLocaleString('en'));
    })
    this.state = {
      value: 0,
      companies: companies
    };
  }

  handleChange = (event, value) => {
    this.setState({
      value: value
    });
  };

  renderTableRows = (sort) => {
    let rows = [], sortedValue;
    if (sort === 'asc') {
      sortedValue = _.orderBy(this.state.companies, ['totalValue'], ['asc'])
    } else {
      sortedValue = _.orderBy(this.state.companies, ['totalValue'], ['desc'])
    }

    sortedValue.map(d => {
      const change = ((d.price - d.originPrice) / d.originPrice).toFixed(2);
      const changedRate = (((d.price - d.originPrice) / d.originPrice) * 100).toFixed(2)
      rows.push(
        <tr key={d.id}>
          <td className="columns-table" >{d.name}</td>
          <td className="columns-table" >{d.company}</td>
          <td className="columns-table" >{d.price}</td>
          <td className="columns-table" >{d.totalValue.toLocaleString('en')}</td>
          <td style={{ color: change > 0 ? "green" : "red" }}>{change}</td>
          <td style={{ color: change > 0 ? "green" : "red" }}>{changedRate}%</td>
        </tr>
      )
    })
    let tbdy = <tbody>
      {rows.map(obj => obj)}
    </tbody>
    return tbdy;
  }

  componentDidMount() {
    let amplitude = _.random(10, 30)
    this.interval = setInterval(() => {
      this.state.companies.map(d => {
        this.setState({
          companies: this.state.companies.map(
            (el) => Object.assign({}, el, { price: ((Math.random() * (el.price * 1.05 - el.price * 0.95) + el.price * 0.95).toFixed(2)) }),
          )
        });

        this.setState({
          companies: this.state.companies.map(
            (el) => Object.assign({}, el, { volume: el.volume + amplitude }),
          )
        });

        this.setState({
          companies: this.state.companies.map(
            (el) => Object.assign({}, el, { totalValue: Math.round(el.volume * el.price) }),
          )
        });
      })

    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    const Table = (props) => {
      const { sort } = props;
      return (
        <Fragment>
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Company</th>
                <th>Price</th>
                <th>Value</th>
                <th>Change</th>
                <th>%Change</th>
              </tr>
            </thead>
            {this.renderTableRows(sort)}
          </table>
        </Fragment>
      )
    }
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.tab}>
          <span className={classes.title} >S&P/ASX</span>
          <Tabs value={value} onChange={this.handleChange} className="flex-end111">
            <Tab label="Top Gainer" />
            <Tab label="Top Loser" />
          </Tabs>
        </AppBar>
        {value === 0 &&
          <TabContainer>
            <Table sort={'desc'} />
          </TabContainer>}
        {value === 1 && <TabContainer>
          <Table sort={'asc'} />
        </TabContainer>}
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);

