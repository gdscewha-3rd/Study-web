import { Component } from 'react/cjs/react.production.min';

class UpdateContent extends Component{

    constructor(props){
        super(props);
        this.state={
            title : this.props.data.title,
            desc : this.props.data.desc
        }
        this.inputFormHandler=this.inputFormHandler.bind(this); // 자기자신 컴포넌트로 bind 시킨 함수로 교체
    }

    // onchange event 를 받아서 title, desc 를 동기화.
    inputFormHandler(e){
      this.setState({[e.target.name] : e.target.value});
    }

    render(){ 
        console.log('update render');
      return (   
        <article>
          <h2>update</h2>
            <form action="/update_process" 
            method="post"/*post방식으로 제출해야 url이 노출 X*/
            onSubmit={function(e){
                e.preventDefault(); //페이지 새로고침 막기
                //console.log(e.target.title.value);
                /*this.props.onSubmit(e.target.title.value,
                    e.target.desc.value); //인자로 title, value값 보내기*/
                    this.props.onSubmit(this.props.data.id,
                        this.state.title,
                       this.state.desc); //인자로 title, value값 보내기
            }.bind(this)}> 
            <input type="hidden" value={this.props.data.id}/>
                <p><input type='text' name='title'
                value={this.state.title} 
                placeholder='title'
                onChange={this.inputFormHandler}/></p>

                <p>
                    <textarea name="desc" 
                    placeholder='description'
                    value={this.state.desc}
                    onChange={this.inputFormHandler}
                   /> 
                   
                    
                </p>
                <p>
                    <input type="submit" value="submit"></input>
                </p>
            </form>
        </article>
      )
    }
  }
  
  export default UpdateContent;