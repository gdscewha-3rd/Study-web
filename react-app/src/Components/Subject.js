import { Component } from 'react/cjs/react.production.min';

class Subject extends Component{
    render(){ 
      return (   
         <header>
            <h1>
            <a href="/">{this.props.title}</a>
            </h1>
        {this.props.sub}
         </header>);
    }
  }
  
  export default Subject;