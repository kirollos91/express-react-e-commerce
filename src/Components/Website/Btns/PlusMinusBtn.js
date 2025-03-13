import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function PlusMinusBtn({ setCount, count, change }) {
  const [btn, setBtn] = useState(count || 1);

  useEffect(() => {
    if (setCount) setCount(btn);
  }, [btn]);

  return (
    <div className="input-group d-flex align-items-center gap-2">
      <span
        className="input-group-btn"
        onClick={() => {
          if (btn <= 0) return setBtn(0);
          setBtn((prev) => prev - 1);
        }}
      >
        <button
          type="button"
          className="btn btn-danger btn-number"
          data-type="minus"
          data-field="quant[2]"
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
      </span>
      <div className="">
        <input
          type="number"
          name="quant[2]"
          className="form-control input-number"
          min="1"
          max="100"
          value={btn}
          onChange={(event) => {
            if (+event.target.value < 0) return setBtn(0);
          }}
        />
      </div>
      <span
        className="input-group-btn"
        onClick={() => {
          setBtn((prev) => prev + 1);
        }}
      >
        <button
          type="button"
          className="btn btn-success btn-number"
          data-type="plus"
          data-field="quant[2]"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </span>
    </div>
  );
}
