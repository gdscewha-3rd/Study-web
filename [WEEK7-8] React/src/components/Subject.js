import React, { Component } from 'react';

class Subject extends Component{
    render(){
      return(
        <header>
              <h1><a href="/" onClick={function (e) {
                e.preventDefault(); // 이벤트 설치
                this.props.onChangePage(); //얘는 함수
              }.bind(this)
              }>{this.props.title}</a></h1>
              {this.props.sub}
        </header>
      )
    }
  }
  export default Subject;