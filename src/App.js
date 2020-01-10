import React, {Component} from 'react';
import Button from './components/Button';
import './css/style.css';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      current : "0",
      previous : [],
      netxIsReset: false,
    }
  }

  reset = () => {
    this.setState({current: '0', previous: [], netxIsReset: false});
  }

  addToCurrent = (symbol) => {
    if(symbol == "x"){ symbol = '*'; }    
    if (['/', '*', '+', '-'].indexOf(symbol) > -1) {
      let {previous} = this.state;
      previous.push(this.state.current + symbol);
      this.setState({previous, netxIsReset: true});
    } else {
      if ((this.state.current === '0' && symbol !== '.') || this.state.netxIsReset) {
        this.setState({current: symbol, netxIsReset: false});        
      } else {
        if (symbol === '.' && this.state.current.includes('.')) {
           
        }else{
          this.setState({current: this.state.current + symbol});
        }
      }
    }    
  }

  caluculate = (symbol) => {
    let {current, previous, netxIsReset} = this.state;
    if(previous.length){      
      current = eval(String(previous[previous.length - 1] + current));
      this.setState({current, previous: [], netxIsReset: true});
    }
  }
  render() {
    const buttons = [
      {symbol: 'C', col: 3, action: this.reset},
      {symbol: '/', col: 1, action: this.addToCurrent},
      {symbol: '7', col: 1, action: this.addToCurrent},
      {symbol: '8', col: 1, action: this.addToCurrent},
      {symbol: '9', col: 1, action: this.addToCurrent},
      {symbol: 'x', col: 1, action: this.addToCurrent},
      {symbol: '4', col: 1, action: this.addToCurrent},
      {symbol: '5', col: 1, action: this.addToCurrent},
      {symbol: '6', col: 1, action: this.addToCurrent},
      {symbol: '-', col: 1, action: this.addToCurrent},
      {symbol: '1', col: 1, action: this.addToCurrent},
      {symbol: '2', col: 1, action: this.addToCurrent},
      {symbol: '3', col: 1, action: this.addToCurrent},
      {symbol: '+', col: 1, action: this.addToCurrent},
      {symbol: '0', col: 1, action: this.addToCurrent},
      {symbol: '.', col: 1, action: this.addToCurrent},
      {symbol: '=', col: 2, action: this.caluculate},
    ]
    return (
      <div>
        {
          this.state.previous.length
            ? <div className='last-op'>{this.state.previous[this.state.previous.length-1]}</div>
            : null
        }
        <input className="input-result" type="text" value={this.state.current}/>
        {buttons.map((btn, i) => {
          return <Button 
                    key={i}
                    symbol={btn.symbol} 
                    cols={btn.col} 
                    action={(symbol) => btn.action(btn.symbol)}/>
        })}
      </div>
    );
  }
}

export default App;
