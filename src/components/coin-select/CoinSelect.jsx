import { useEffect, useRef, useState } from 'react';
import classes from './CoinSelect.module.css';

export default function CoinSelect(props) {
  const span = useRef();
  const [width, setWidth] = useState(0);
  const [content, setContent] = useState('');

  const [value, setValue] = useState(0);
  const [coin, setCoin] = useState('Yuki');

  const onChange = e => {
    if (e.nativeEvent.isTrusted) {
      const inputValue = parseFloat(e.nativeEvent.target.value);
      const sanitizedValue = isNaN(inputValue) ? 0 : inputValue;
      const bountValue = Math.max(Math.min(sanitizedValue, props.maxValue ?? sanitizedValue), props.minValue ?? 0);

      e.target.value = bountValue;
      setValue(bountValue);
    }
  };

  const onSelect = e => {
    if (e.nativeEvent.isTrusted) {
      const value = e.nativeEvent.target.value;
      setCoin(value);
    }
  }

  const onResize = () => {
    setContent(value);
  };

  useEffect(() => {
    setWidth(span.current.offsetWidth);
  }, [content]);

  useEffect(() => {
    onResize();

    if (props.onValueChange) {
      props.onValueChange(value);
    }
  }, [value]);

  useEffect(() => {
    if (props.onCoinChange) {
      props.onCoinChange(coin);
    }
  }, [coin]);

  return (
    <div className={classes.input}>
      <span className={classes.hide} ref={span}>{content}</span>
      <input
        type="number"
        placeholder="10"
        style={{ width }}
        max={props.maxValue}
        min={props.minValue}
        step={props.stepValue}
        onChange={onChange}
      />

      <select
        className={classes.select}
        onChange={e => onSelect(e)}
      >
        <option value="yuki">YUKI</option>
        {/* <option value="bnrg">BNRG</option>
        <option value="bnb">BNB</option>
        <option value="busd">BUSD</option> */}
      </select>
    </div>
  );
}
