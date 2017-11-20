import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class MemoList extends Component {
  render() {
    const mapToComponents = data => {
        return data.map((memo, i) => {
            return (<Memo 
                        data={memo}
                        ownership={ (memo.writer === this.props.currentUser) }
                        key={memo._id}
            />);
        });
    }
    return (
      <div>
        {mapToComponents(this.props.data)}
      </div>
    )
  }
}


MemoList.propTypes = {
    data: PropTypes.array,
    currentUser: PropTypes.string
};

MemoList.defaultProps = {
    data: [],
    currentUser: ''
};

