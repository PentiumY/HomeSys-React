import React, { Component } from 'react';
import { SketchPicker, ColorResult } from 'react-color';

interface State {
  background: string;
}

class MyComponent extends Component<{}, State> {
  state: State = {
    background: '#fff',
  };

  handleChangeComplete = (color: ColorResult) => {
    this.setState({ background: color.hex });
  };

  render() {
    return (
      <SketchPicker
        color={this.state.background}
        onChangeComplete={this.handleChangeComplete}
      />
    );
  }
}

export default MyComponent;
