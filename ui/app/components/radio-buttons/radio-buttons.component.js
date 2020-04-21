import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import FormHelperText from '@material-ui/core/FormHelperText'

const styles = theme => ({
  root: {
    fontSize: '12px',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  formLabel: {
    color: '#5b5b5b',
    fontSize: '16px',
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
})

class RadioButtons extends React.Component {
  handleChange = event => {
    this.setState({ value: event.target.value })
  };

  render () {
    const { classes, onChange, value } = this.props

    return (
      <div>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend" className={classes.formLabel}>Select HD Path</FormLabel>
          <FormHelperText id="name-helper-text">{`If you don't see your existing accounts, try switching paths to "Legacy"`}</FormHelperText>
          <RadioGroup
            row
            name="chain"
            className={classes.group}
            value={value}
            onChange={onChange}
          >
            <FormControlLabel value="WAN" control={<Radio color="primary"/>} label="Live" />
            <FormControlLabel value="ETH" control={<Radio color="primary"/>} label="Legacy" />
          </RadioGroup>
        </FormControl>
      </div>
    )
  }
}

RadioButtons.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(RadioButtons)
