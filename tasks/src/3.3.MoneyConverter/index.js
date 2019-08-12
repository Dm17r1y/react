import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import './styles.css';

/**
    Допиши конвертер валют.
    - Если пользователь ввел значение в рублях, то количество евро обновляется согласно курсу
    - Если пользователь ввел значение в евро, то количество рублей обновляется согласно курсу
 */

const RUBLES_IN_ONE_EURO = 70;

class MoneyConverter extends React.Component {
  constructor() {
    super()
    this.state = { rub: 0, euro: 0 }

  }

  updateRub = value => {
    const rub = Number.parseFloat(value) || 0;
    this.setState({ rub: rub, euro: rub / RUBLES_IN_ONE_EURO });
  }

  updateEuro = value => {
    const euro = Number.parseFloat(value) || 0;
    this.setState({ rub: euro * RUBLES_IN_ONE_EURO, euro: euro });
  }

  render() {
    return (
      <div className="root">
        <div className="form">
          <h2>Конвертер валют</h2>
          <div>
            <span>&#8381;</span>
            <Money currency={this.state.rub} onChange={this.updateRub} />
            &mdash;
            <Money currency={this.state.euro} onChange={this.updateEuro} />
            <span>&euro;</span>
          </div>
        </div>
      </div>
    );
  }
}

class Money extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <input
        type="text"
        value={this.props.currency}
        onChange={this.handleChangeValue}
      />
    );
  }

  handleChangeValue = event => {
    const value = extractNumberString(event.target.value);
    this.props.onChange(value);
  };
}

Money.propTypes = {
  onChange: PropTypes.func,
  currency: PropTypes.number,
};

function extractNumberString(value) {
  const str = value.replace(/^0+/g, '').replace(/[^\.0-9]/g, '');
  const parts = str.split('.');
  return parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : str;
}

ReactDom.render(<MoneyConverter />, document.getElementById('app'));

/**
    Подсказки:
    - Сейчас каждый компонент Money хранит свое значение в собственном состоянии,
      чтобы конвертер работал, нужно уметь обновлять значение извне, поэтому нужно получать его из props.
    - В MoneyConverter наоборот надо создать состояние, которое будет хранить значения в обеих валютах.
      Таким образом ты сделаешь Lift State Up.
    - Заметь, что компонент Money теперь не содержит состояние и его можно переделать в функциональный компонент.
 */
