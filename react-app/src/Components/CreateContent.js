import { Component } from 'react/cjs/react.production.min';

class CreateContent extends Component{
    render(){ 
      return (   
        <article>
          <h2>create</h2>
            <form action="/create_process" 
            method="post"/*post방식으로 제출해야 url이 노출 X*/
            onSubmit={function(e){
                e.preventDefault(); //페이지 새로고침 막기
                //console.log(e.target.title.value);
                this.props.onSubmit(e.target.title.value,e.target.desc.value); //인자로 title, value값 보내기
            }.bind(this)}> 
                <p><input type='text' name='title' 
                placeholder='title'></input></p>

                <p>
                    <textarea name="desc" placeholder='description'>
                    </textarea>
                </p>
                <p>
                    <input type="submit" value="submit"></input>
                </p>
            </form>
        </article>
      )
    }
  }
  
  export default CreateContent;