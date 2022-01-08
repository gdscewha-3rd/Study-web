import { Component } from 'react/cjs/react.production.min';


class TOC extends Component{
  
  //만일 push를 이용했더라면 이전값 = 새로운 값 이어서 아래 최적화기법을 사용할 수 없음.
  shouldComponentUpdate(newProps,newState){ // render()함수의 실행여부 반환
    console.log("shouldComponetUpdate");
    if(this.props.data===newProps.data){ // 기존 props = 새로운 props 이면 
      return false; // 굳이 다시 렌더링 할 필요 X
    }

    return true;
  }

    render(){
      console.log("========>TOC render");
        var data=this.props.data;
        var lists = []; // nav 목록을저장할 배열.
        for(var i=0;i<data.length;i++){
            lists.push(<li key={data[i].id}> 
            <a href={"/content/" + data[i].id} 
            data-id ={data[i].id}
            onClick={function(e){
              e.preventDefault();
              this.props.onChangePage(e.target.dataset.id); //read모드로 변경. 선택된 contents 번호 인자로 넘겨주기
            }.bind(this)}>{data[i].title}</a></li>);
        }
        
      return (   
        <nav>
        <ul> 
            {lists}
        </ul>
    </nav>
      )
    }
  }

  export default TOC; // TOC 를 외부에서 쓸수 있도록함.