import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import { type Bonus, type Stats } from "./Types";
import Rolls from "./Rolls";

const storageKeys = {
  stats: "stats",
  bonuses: "bonuses",
};

function App() {
  // stats
  const storedStats = localStorage.getItem(storageKeys.stats);
  const initialStats: Stats = storedStats
    ? JSON.parse(storedStats)
    : { willpower: 0, channeling: 0, intelligence: 0, langMagic: 0 };
  const [willpower, setWillpower] = useState(initialStats.willpower);
  const [channeling, setChanneling] = useState(initialStats.channeling);
  const [intelligence, setIntelligence] = useState(initialStats.intelligence);
  const [langMagic, setLangMagic] = useState(initialStats.langMagic);
  useEffect(() => {
    localStorage.setItem(
      storageKeys.stats,
      JSON.stringify({ willpower, channeling, intelligence, langMagic })
    );
  }, [willpower, channeling, intelligence, langMagic]);

  // bonuses
  const [bonuses, setBonuses] = useState<Record<string, Bonus>>(
    JSON.parse(localStorage.getItem(storageKeys.bonuses) ?? "{}")
  );
  const addBonus = useCallback(() => {
    const id = crypto.randomUUID();
    setBonuses({ ...bonuses, [id]: { id, bonusSL: 0, description: "" } });
  }, [bonuses]);
  const removeBonus = useCallback(
    (id: string) => {
      const { [id]: _, ...rest } = bonuses;
      setBonuses(rest);
    },
    [bonuses]
  );
  const updateBonus = useCallback(
    (B: Bonus) => setBonuses({ ...bonuses, [B.id]: B }),
    [bonuses]
  );
  useEffect(() => {
    localStorage.setItem(storageKeys.bonuses, JSON.stringify(bonuses));
  }, [bonuses]);
  const totalbonusSL = useMemo(
    () => Object.values(bonuses).reduce((prev, cur) => prev + cur.bonusSL, 0),
    [bonuses]
  );
  return (
    <main>
      <h1>Channeling calculator</h1>
      <button className="secondary" onClick={() => localStorage.clear()}>
        Reset
      </button>
      <fieldset id="statFields">
        <legend>Stats</legend>
        <label htmlFor="willpower">Willpower</label>
        <input
          name="willpower"
          type="number"
          value={willpower}
          onChange={(e) => setWillpower(parseInt(e.target.value))}
        />
        <label htmlFor="intelligence">Intelligence</label>
        <input
          name="intelligence"
          type="number"
          value={intelligence}
          onChange={(e) => setIntelligence(parseInt(e.target.value))}
        />
        <label htmlFor="channeling">Channeling</label>
        <input
          name="channeling"
          type="number"
          value={channeling}
          onChange={(e) => setChanneling(parseInt(e.target.value))}
        />
        <label htmlFor="langMagic">Language magic</label>
        <input
          name="langMagic"
          type="number"
          value={langMagic}
          onChange={(e) => setLangMagic(parseInt(e.target.value))}
        />
      </fieldset>
      <fieldset id="bonusFields">
        <legend>Bonuses</legend>
        <button className="secondary" onClick={addBonus}>
          + Add bonus
        </button>
        <table>
          <thead>
            <tr>
              <td>Description</td>
              <td>Bonus SL</td>
            </tr>
          </thead>
          <tbody>
            {Object.values(bonuses).map((b) => (
              <tr key={b.id}>
                <td>
                  <input
                    type="text"
                    value={b.description}
                    onChange={(e) =>
                      updateBonus({ ...b, description: e.target.value })
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={b.bonusSL}
                    onChange={(e) =>
                      updateBonus({ ...b, bonusSL: parseInt(e.target.value) })
                    }
                  />
                </td>
                <td>
                  <button
                    className="secondary"
                    onClick={() => removeBonus(b.id)}
                  >
                    x
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </fieldset>
      <Rolls
        {...{
          willpower,
          channeling,
          intelligence,
          langMagic,
          bonusSL: totalbonusSL,
        }}
      />
    </main>
  );
}

export default App;
