/// <reference path="Pacijent.ts" />

class Bolnica {
  private _naziv: string;
  private _grad: string;
  private _pacijenti: Pacijent[];
  

	constructor(naziv: string, grad: string) {
		this._naziv = naziv;
		this._grad = grad;
		this._pacijenti = [];
	}

  refreshHTML(): void {
    let out = '';
    this._pacijenti.forEach(p => {
      let proba = '';
      for(let i = 0; i <p.ostaliSimptomi.length; i++) {
        proba += ' ' + p.ostaliSimptomi[i].naziv;
      }
      out += `
      <tr> 
        <td>${p.id}
        <td>${p.ime}</td>
        <td>${p.prezime}</td>
        <td>${p.telesnaTemperatura}</td>
        <td>${p.pcrTest}</td>
        <td><ul>
          ${proba}
        </ul></td>
        `;
    });
    document.getElementById('tbody').innerHTML = out; 
  }

  dodajPacijenta(value: Pacijent): void {
    this._pacijenti.push(value);
    this.refreshHTML();
  } 

  procentualnoObolelih(): number {
    const oboleli = this._pacijenti.filter(p => p.pcrTest == "Pozitivan");
    return (oboleli.length / this._pacijenti.length) * 100;
  }

    /**
     * Getter naziv
     * @return {string}
     */
	public get naziv(): string {
		return this._naziv;
	}

    /**
     * Getter grad
     * @return {string}
     */
	public get grad(): string {
		return this._grad;
	}

    /**
     * Getter pacijenti
     * @return {Pacijent[]}
     */
	public get pacijenti(): Pacijent[] {
		return this._pacijenti;
	}

    /**
     * Setter naziv
     * @param {string} value
     */
	public set naziv(value: string) {
		this._naziv = value;
	}

    /**
     * Setter grad
     * @param {string} value
     */
	public set grad(value: string) {
		this._grad = value;
	}

    /**
     * Setter pacijenti
     * @param {Pacijent[]} value
     */
	public set pacijenti(value: Pacijent[]) {
		this._pacijenti = value;
	}
  

}

