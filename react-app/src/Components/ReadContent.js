import { Component } from 'react/cjs/react.production.min';

class ReadContent extends Component{
    render(){ 
      return (   
        <article>
          <h2>{this.props.title}</h2>
          {this.props.desc}
        </article>
      )
    }
  }
  
  export default ReadContent;