import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Write, MemoList } from '../components';
import { memoPostRequest, memoListRequest } from 'actions/memo';

class Home extends Component {

  


  constructor(props) {
    super(props);
    this.handlePost = this.handlePost.bind(this);
    this.loadNewMemo = this.loadNewMemo.bind(this);
  }

  componentDidMount() {
     // LOAD NEW MEMO EVERY 5 SECONDS
     const loadMemoLoop = () => {
          this.loadNewMemo().then(
              () => {
                  this.memoLoaderTimeoutId = setTimeout(loadMemoLoop, 5000);
              }
          );
      };
      
      this.props.memoListRequest(true).then(
          () => {
              // BEGIN NEW MEMO LOADING LOOP
              loadMemoLoop();
          }
      );
  }

  componentWillUnmount() {
      // STOPS THE loadMemoLoop
      clearTimeout(this.memoLoaderTimeoutId);
  }

  loadNewMemo() {
    // CANCEL IF THERE IS A PENDING REQUEST
      if(this.props.listStatus === 'WAITING') 
          return new Promise((resolve, reject)=> {
              resolve();
          });
      
      // IF PAGE IS EMPTY, DO THE INITIAL LOADING
      if(this.props.memoData.length === 0 )
          return this.props.memoListRequest(true);
          
      return this.props.memoListRequest(false, 'new', this.props.memoData[0]._id);
  }

  /* POST MEMO */
  handlePost(contents) {
    return this.props.memoPostRequest(contents).then(
      () => {
        if (this.props.postStatus.status === "SUCCESS") {
          this.loadNewMemo().then(
              () => {
                  Materialize.toast('Success!', 2000);
              }
          );
        } else {
          /*
              ERROR CODES
                  1: NOT LOGGED IN
                  2: EMPTY CONTENTS
          */
          let $toastContent;
          switch (this.props.postStatus.error) {
            case 1:
              // IF NOT LOGGED IN, NOTIFY AND REFRESH AFTER
              $toastContent = $('<span style="color: #FFB4BA">You are not logged in</span>');
              Materialize.toast($toastContent, 2000);
              setTimeout(() => { location.reload(false); }, 2000);
              break;
            case 2:
              $toastContent = $('<span style="color: #FFB4BA">Please write something</span>');
              Materialize.toast($toastContent, 2000);
              break;
            default:
              $toastContent = $('<span style="color: #FFB4BA">Something Broke</span>');
              Materialize.toast($toastContent, 2000);
              break;
          }
        }
      }
    );
  }
  render() {
    const write = (
      <Write onPost={this.props.handlePost} />
    );

    var mockData = [
      {
        "_id": "578b958ec1da760909c263f4",
        "writer": "velopert",
        "contents": "Testing",
        "__v": 0,
        "is_edited": false,
        "date": {
          "edited": "2016-07-17T14:26:22.428Z",
          "created": "2016-07-17T14:26:22.428Z"
        },
        "starred": []
      },
      {
        "_id": "578b957ec1da760909c263f3",
        "writer": "velopert",
        "contents": "Data",
        "__v": 0,
        "is_edited": false,
        "date": {
          "edited": "2016-07-17T14:26:06.999Z",
          "created": "2016-07-17T14:26:06.999Z"
        },
        "starred": []
      },
      {
        "_id": "578b957cc1da760909c263f2",
        "writer": "velopert",
        "contents": "Mock",
        "__v": 0,
        "is_edited": false,
        "date": {
          "edited": "2016-07-17T14:26:04.195Z",
          "created": "2016-07-17T14:26:04.195Z"
        },
        "starred": []
      },
      {
        "_id": "578b9579c1da760909c263f1",
        "writer": "velopert",
        "contents": "Some",
        "__v": 0,
        "is_edited": false,
        "date": {
          "edited": "2016-07-17T14:26:01.062Z",
          "created": "2016-07-17T14:26:01.062Z"
        },
        "starred": []
      },
      {
        "_id": "578b9576c1da760909c263f0",
        "writer": "velopert",
        "contents": "Create",
        "__v": 0,
        "is_edited": false,
        "date": {
          "edited": "2016-07-17T14:25:58.619Z",
          "created": "2016-07-17T14:25:58.619Z"
        },
        "starred": []
      },
      {
        "_id": "578b8c82c1da760909c263ef",
        "writer": "velopert",
        "contents": "blablablal",
        "__v": 0,
        "is_edited": false,
        "date": {
          "edited": "2016-07-17T13:47:46.611Z",
          "created": "2016-07-17T13:47:46.611Z"
        },
        "starred": []
      }
    ];

    return (
      <div className="wrapper">
        {this.props.isLoggedIn ? write : undefined}
        <MemoList data={this.props.memoData} currentUser={this.props.currentUser} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.authentication.status.isLoggedIn,
    postStatus: state.memo.post,
    currentUser: state.authentication.status.currentUser,
    memoData: state.memo.list.data,
    listStatus: state.memo.list.status
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    memoPostRequest: (contents) => {
      return dispatch(memoPostRequest(contents));
    },
    memoListRequest: (isInitial, listType, id, username) => {
      return dispatch(memoListRequest(isInitial, listType, id, username));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);