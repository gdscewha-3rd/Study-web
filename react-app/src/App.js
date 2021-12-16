import './App.css'; // App 컴포넌트의 디자인
import { Component } from 'react/cjs/react.production.min';
import TOC from './Components/TOC'; //생성한 컴포넌트 가져오기
import Subject from './Components/Subject';
import Content from './Components/Content';

class App extends Component{

  constructor(props){ //제일먼저 실행
    super(props);
    //이부분에 초기화 코드 작성

    //state 생성
    this.state={

      mode:'read', // 현재 읽고있는 페이지
      subject : {title : 'WEB', sub:'World wide Web!'},
      welcome : {title:'welcome', desc:"Hello, React!!"},
      contents :[
        {id:1, title:'HTML',desc:"HTML is HyperText Markup language."},
        {id:2, title:'CSS', desc:"CSS is for design"},
        {id:3, title:'Javascript',desc:"Javascript is for interactive"}

      ]
    }
  }

  render(){
    var _title,_desc=null;

    if(this.state.mode==='welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    }
    else if(this.state.mode==='read'){
      _title = this.state.contents[0].title;
      _desc = this.state.contents[0].desc;
    }

    return (
      <div className="App">
       {/*<Subject 
       title={this.state.subject.title} 
       sub={this.state.subject.sub}>
       </Subject>*/}
       <header>
            <h1>
            <a href="/" onClick={function(e){
              console.log(e);
              e.preventDefault(); // a태그의 기본적인 동작을 막음.
              this.setState({mode:'welcome'});
            }.bind(this)}>{this.state.subject.title}</a>
            </h1>
            {this.state.subject.sub}
         </header>
       <TOC data={this.state.contents}></TOC>
       <Content title={_title} desc={_desc}></Content>
      </div>
    )
  }
}


export default App;
