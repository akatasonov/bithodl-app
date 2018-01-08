import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import ReactNativeHaptic from 'react-native-haptic';
import StyledInput from './StyledInput';

const SUCCESS_COLOR = '#33CF8B';
const FAILURE_COLOR = '#FF5A59';

const styles = StyleSheet.create({
  container: {
    width: '50%',
    padding: 4
  },
  number: {
    position: 'absolute',
    top: 12.5,
    left: 13,
    fontFamily: 'Menlo-Regular',
    fontSize: 13,
    color: '#DDDDDF'
  },
  input: {
    fontFamily: 'Menlo-Regular',
    letterSpacing: 1,
    width: '100%',
    padding: 0,
    paddingLeft: 20
  }
});

export default class RecoveryPhraseWordInput extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.isCorrect && !this.props.isCorrect) {
      ReactNativeHaptic.generate('selection');
    }
  }

  focus() {
    this._input.focus();
  }

  render() {
    const index = this.props.index;
    const returnKeyType = index < 11 ? 'next' : 'done';
    const colorStyle = {};
    let borderColor = null;

    if (this.props.isCorrect === true) {
      colorStyle.color = SUCCESS_COLOR;
      borderColor = SUCCESS_COLOR;
    }

    if (this.props.isIncorrect === true) {
      colorStyle.color = FAILURE_COLOR;
      borderColor = FAILURE_COLOR;
    }

    return (
      <View style={styles.container}>
        <View>
          <StyledInput
            ref={(ref) => { this._input = ref; }}
            style={[styles.input, colorStyle]}
            autoCapitalize='none'
            returnKeyType={returnKeyType}
            enforceLowercase={true}
            trim={true}
            borderColor={borderColor}
            onChangeText={this.props.onChangeText}
            onSubmitEditing={this.props.onSubmitEditing}
          />
          <Text style={[styles.number, colorStyle]}>
            {index + 1}.
          </Text>
        </View>
      </View>
    );
  }
}

RecoveryPhraseWordInput.propTypes = {
  index: PropTypes.number.isRequired,
  isCorrect: PropTypes.bool,
  isIncorrect: PropTypes.bool,
  onChangeText: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func
};
