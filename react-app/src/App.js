import './App.css'; // App 컴포넌트의 디자인
import { Component } from 'react/cjs/react.production.min';
import TOC from './Components/TOC'; //생성한 컴포넌트 가져오기
import Subject from './Components/Subject';
import ReadContent from './Components/ReadContent';
import Control from './Components/Control';
import CreateContent from './Components/CreateContent';
import UpdateContent from './Components/UpdateContent';

class App extends Component{

  constructor(props){ //제일먼저 실행
    super(props);
    //이부분에 초기화 코드 작성

    this.max_content_id=3; //마지막 글번호 -> ui영향 X 이므로 state로 선언하지 않음
    //state 생성
    this.state={

      mode:'welcome', // read vs welcome 
      selected_content_id : 1, //현재 선택된 페이지 
      subject : {title : 'WEB', sub:'World wide Web!'},
      welcome : {title:'welcome', desc:"Hello, React!!"},
      contents :[
        {id:1, title:'HTML',desc:"HTML is HyperText Markup language."},
        {id:2, title:'CSS', desc:"CSS is for design"},
        {id:3, title:'Javascript',desc:"Javascript is for interactive"}
       
      ]
    }
    
  }
  //contents에서 현재 활성화중인 selected_content_id인 data 반환
  getReadContent(){
 for(var i=0;i<this.state.contents.length;i++){
 
   var data= this.state.contents[i];
    if(data.id === this.state.selected_content_id){
      return data;
    }

  }
  return null;
  }
  
  getContent(){
    var _title,_desc,_article=null;

    // 모드와 content id에 따라서 title,desc 정하기.
    if(this.state.mode==='welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article=<ReadContent title={_title} desc={_desc}></ReadContent>
    }
    else if(this.state.mode==='read'){

      var _contents= this.getReadContent();
     _article=<ReadContent title={_contents.title} desc={_contents.desc}></ReadContent>
     
    }
    else if (this.state.mode==='create'){
      _article= <CreateContent onSubmit={function(_title,_desc){
        this.max_content_id=this.max_content_id+1;
       /* this.state.contents.push(
          {id : this.max_content_id , title:_title, desc:_desc}
        );*/
          /*var _contents =   this.state.contents.concat(
            {id : this.max_content_id , title:_title, desc:_desc}
          );*/
          var _contents=Array.from(this.state.contents);//contents 배열 복제
          _contents.push({id : this.max_content_id , title:_title, desc:_desc});
        // 바뀐 contents로 state값 업데이트
        this.setState({contents: _contents,
          selected_content_id : this.max_content_id,
          mode : 'read'
        });
        }.bind(this)}/>
    }
    else if(this.state.mode=='update'){
      var _content= this.getReadContent();
     
      _article= <UpdateContent data ={_content} 
      onSubmit={function(_id,_title,_desc){ // 식별자가 id인 contents의 title, desc를 변경.
          var _contents=Array.from(this.state.contents);// 기존 contents 배열 복제
       for(var i=0;i<_contents.length;i++){
         if(_contents[i].id==_id){
          _contents[i]={id:_id,title:_title,desc:_desc};
          break;
         }
         
       }
       this.setState({contents : _contents});
          
        // 바뀐 contents로 state값 업데이트
        this.setState({contents: _contents,
          mode :'read'});
     
        }.bind(this)}/>
    }
    
    return _article;

  }

  render(){
    

    return (
      <div className="App">
       <Subject 
       title={this.state.subject.title} 
       sub={this.state.subject.sub}
       onChangePage={function(){ //사용자 컴포넌트 이벤트
         this.setState({mode :'welcome'});
       }.bind(this)}>
       </Subject>

       {/*<header>
            <h1>
            <a href="/" onClick={function(e){
              console.log(e);
              e.preventDefault(); // a태그의 기본적인 동작을 막음.
              this.setState({mode:'welcome'});
            }.bind(this)}>{this.state.subject.title}</a>
            </h1>
            {this.state.subject.sub}
         </header>
          */}
       <TOC data={this.state.contents} 
       onChangePage={function(id){
         this.setState({mode : 'read', selected_content_id:Number(id) });
       }.bind(this)}></TOC>
      <Control onChangeMode={function(_mode){

    if (_mode ==='delete'){
      if(window.confirm('are you sure to delete?')){
       var _contents=Array.from(this.state.contents)
       for(var i=0;i<_contents.length;i++){
         if(_contents[i].id==this.state.selected_content_id){
          _contents.splice(i,1); //i번째 인덱스요소 삭제
          break;
          }
     
       }
      }
      this.setState({mode:'welcome',contents:_contents});
      alert('delete completed');
    }
    else{ //delete mode로 변경하는게 아니라면 
  this.setState({mode : _mode});
    }
         
      }.bind(this)}
      />
       {this.getContent()}
      </div>
    )
  }
}


export default App;
