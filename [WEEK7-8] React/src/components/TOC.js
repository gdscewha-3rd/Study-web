import React, { Component } from 'react';

class TOC extends Component{
    render(){
        var data = this.props.data;
        var i = 0;
        var lists = [];
        while (i < data.length){
            lists.push(<li key={data[i].id}>
                <a
                href={"/content/"+data[i].id}
                data-id ={data[i].id} //현재 데이터의 id 속성을 줘보자
                onClick={function (e) {
                    e.preventDefault();
                    this.props.onChangePage(e.target.dataset.id); 
                    //TOC가 app.js의 함수를 호출
                }.bind(this)}
                >{data[i].title}</a>
                </li>);
            i+=1;
        }
      return (
        <nav>
              <ul>
                  {lists}
              </ul>
          </nav>
      );
    }
  }

  export default TOC;