/// <reference path="Simptom.ts" />

class Pacijent {
  private _id: number;
  private _ime: string;
  private _prezime: string;
  private _telesnaTemperatura: number;
  private _pcrTest: string;
  private _ostaliSimptomi: Simptom[]; 

	constructor(id: number, ime: string, prezime: string, telesnaTemperatura: number, pcrTest: string) {
		this._id = id;
		this._ime = ime;
		this._prezime = prezime;
		this._telesnaTemperatura = telesnaTemperatura;
		this._pcrTest = pcrTest;
		this._ostaliSimptomi = [];
	}

  dodajSimptom(simptom: Simptom): void {
    this._ostaliSimptomi.push(simptom);
  }

    /**
     * Getter id
     * @return {number}
     */
	public get id(): number {
		return this._id;
	}

    /**
     * Getter ime
     * @return {string}
     */
	public get ime(): string {
		return this._ime;
	}

    /**
     * Getter prezime
     * @return {string}
     */
	public get prezime(): string {
		return this._prezime;
	}

    /**
     * Getter telesnaTemperatura
     * @return {number}
     */
	public get telesnaTemperatura(): number {
		return this._telesnaTemperatura;
	}

    /**
     * Getter pcrTest
     * @return {string}
     */
	public get pcrTest(): string {
		return this._pcrTest;
	}

    /**
     * Getter ostaliSimptomi
     * @return {Simptom[]}
     */
	public get ostaliSimptomi(): Simptom[] {
		return this._ostaliSimptomi;
	}

    /**
     * Setter id
     * @param {number} value
     */
	public set id(value: number) {
		this._id = value;
	}

    /**
     * Setter ime
     * @param {string} value
     */
	public set ime(value: string) {
		this._ime = value;
	}

    /**
     * Setter prezime
     * @param {string} value
     */
	public set prezime(value: string) {
		this._prezime = value;
	}

    /**
     * Setter telesnaTemperatura
     * @param {number} value
     */
	public set telesnaTemperatura(value: number) {
		this._telesnaTemperatura = value;
	}

    /**
     * Setter pcrTest
     * @param {string} value
     */
	public set pcrTest(value: string) {
		this._pcrTest = value;
	}

    /**
     * Setter ostaliSimptomi
     * @param {Simptom[]} value
     */
	public set ostaliSimptomi(value: Simptom[]) {
		this._ostaliSimptomi = value;
	}

}
		
				
