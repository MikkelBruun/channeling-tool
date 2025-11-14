import { useEffect, useState } from "react";
import type { Stats } from "./Types";
import D10 from "./D10";

type Roll = { first: number; second: number; id: number };

function makeRoll(id: number): Roll {
  return {
    first: Math.floor(Math.random() * 10),
    second: Math.floor(Math.random() * 10),
    id,
  };
}

function calcSL(R: Roll, S: Stats, bonusSL = 0): number {
  const target = S.channeling + S.willpower;
  const value = R.first * 10 + R.second;
  if (value <= target) {
    // success
    return R.first + bonusSL;
  } else {
    return Math.min(0, R.first * -1 + bonusSL);
  }
}

export default function Rolls(P: Stats & { bonusSL?: number }) {
  const { bonusSL, ...stats } = P;
  const [totalSL, setTotalSl] = useState(0);
  const [rolls, _setRolls] = useState<Roll[]>([]);
  const setRolls = (newRolls: Roll[]) => {
    setTotalSl(
      rolls.reduce(
        (prev, cur) => prev + calcSL(cur, stats, bonusSL),
        totalSL ?? 0
      )
    );
    _setRolls(newRolls);
  };
  useEffect(() => {
    setTotalSl(
      rolls.reduce((prev, cur) => prev + calcSL(cur, stats, bonusSL), 0)
    );
  }, [bonusSL, rolls, stats, totalSL]);
  return (
    <div>
      <button onClick={() => setRolls([...rolls, makeRoll(rolls.length)])}>
        Roll
      </button>
      <input type="number" readOnly value={totalSL} id="totalSLField" />
      <table className="rollTable">
        <thead>
          <tr>
            <td>Roll</td>
            <td>SL</td>
          </tr>
        </thead>
        <tbody>
          {rolls.map((R) => (
            <tr>
              <td>
                <D10>{R.first}</D10> <D10>{R.second}</D10>
              </td>
              <td>{calcSL(R, stats, bonusSL)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
