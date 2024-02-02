var Simptom = /** @class */ (function () {
    function Simptom(naziv) {
        this.naziv = naziv;
    }
    return Simptom;
}());
/// <reference path="Simptom.ts" />
var Pacijent = /** @class */ (function () {
    function Pacijent(id, ime, prezime, telesnaTemperatura, pcrTest) {
        this._id = id;
        this._ime = ime;
        this._prezime = prezime;
        this._telesnaTemperatura = telesnaTemperatura;
        this._pcrTest = pcrTest;
        this._ostaliSimptomi = [];
    }
    Pacijent.prototype.dodajSimptom = function (simptom) {
        this._ostaliSimptomi.push(simptom);
    };
    Object.defineProperty(Pacijent.prototype, "id", {
        /**
         * Getter id
         * @return {number}
         */
        get: function () {
            return this._id;
        },
        /**
         * Setter id
         * @param {number} value
         */
        set: function (value) {
            this._id = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pacijent.prototype, "ime", {
        /**
         * Getter ime
         * @return {string}
         */
        get: function () {
            return this._ime;
        },
        /**
         * Setter ime
         * @param {string} value
         */
        set: function (value) {
            this._ime = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pacijent.prototype, "prezime", {
        /**
         * Getter prezime
         * @return {string}
         */
        get: function () {
            return this._prezime;
        },
        /**
         * Setter prezime
         * @param {string} value
         */
        set: function (value) {
            this._prezime = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pacijent.prototype, "telesnaTemperatura", {
        /**
         * Getter telesnaTemperatura
         * @return {number}
         */
        get: function () {
            return this._telesnaTemperatura;
        },
        /**
         * Setter telesnaTemperatura
         * @param {number} value
         */
        set: function (value) {
            this._telesnaTemperatura = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pacijent.prototype, "pcrTest", {
        /**
         * Getter pcrTest
         * @return {string}
         */
        get: function () {
            return this._pcrTest;
        },
        /**
         * Setter pcrTest
         * @param {string} value
         */
        set: function (value) {
            this._pcrTest = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pacijent.prototype, "ostaliSimptomi", {
        /**
         * Getter ostaliSimptomi
         * @return {Simptom[]}
         */
        get: function () {
            return this._ostaliSimptomi;
        },
        /**
         * Setter ostaliSimptomi
         * @param {Simptom[]} value
         */
        set: function (value) {
            this._ostaliSimptomi = value;
        },
        enumerable: false,
        configurable: true
    });
    return Pacijent;
}());
/// <reference path="Pacijent.ts" />
var Bolnica = /** @class */ (function () {
    function Bolnica(naziv, grad) {
        this._naziv = naziv;
        this._grad = grad;
        this._pacijenti = [];
    }
    Bolnica.prototype.refreshHTML = function () {
        var out = '';
        this._pacijenti.forEach(function (p) {
            var proba = '';
            for (var i = 0; i < p.ostaliSimptomi.length; i++) {
                proba += ' ' + p.ostaliSimptomi[i].naziv;
            }
            out += "\n      <tr> \n        <td>".concat(p.id, "\n        <td>").concat(p.ime, "</td>\n        <td>").concat(p.prezime, "</td>\n        <td>").concat(p.telesnaTemperatura, "</td>\n        <td>").concat(p.pcrTest, "</td>\n        <td><ul>\n          ").concat(proba, "\n        </ul></td>\n        ");
        });
        document.getElementById('tbody').innerHTML = out;
    };
    Bolnica.prototype.dodajPacijenta = function (value) {
        this._pacijenti.push(value);
        this.refreshHTML();
    };
    Bolnica.prototype.procentualnoObolelih = function () {
        var oboleli = this._pacijenti.filter(function (p) { return p.pcrTest == "Pozitivan"; });
        return (oboleli.length / this._pacijenti.length) * 100;
    };
    Object.defineProperty(Bolnica.prototype, "naziv", {
        /**
         * Getter naziv
         * @return {string}
         */
        get: function () {
            return this._naziv;
        },
        /**
         * Setter naziv
         * @param {string} value
         */
        set: function (value) {
            this._naziv = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Bolnica.prototype, "grad", {
        /**
         * Getter grad
         * @return {string}
         */
        get: function () {
            return this._grad;
        },
        /**
         * Setter grad
         * @param {string} value
         */
        set: function (value) {
            this._grad = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Bolnica.prototype, "pacijenti", {
        /**
         * Getter pacijenti
         * @return {Pacijent[]}
         */
        get: function () {
            return this._pacijenti;
        },
        /**
         * Setter pacijenti
         * @param {Pacijent[]} value
         */
        set: function (value) {
            this._pacijenti = value;
        },
        enumerable: false,
        configurable: true
    });
    return Bolnica;
}());
/// <reference path="Bolnica.ts" />
var bolnice = [];
var aktivnaBolnica = null;
function promeniAktivnu(selekt) {
    aktivnaBolnica = bolnice.filter(function (el) { return el.naziv == selekt.value; })[0];
    aktivnaBolnica.refreshHTML();
}
function wireEvents() {
    document.getElementById('dodajPacijenta').addEventListener('click', function () {
        var ime = document.getElementById('ime');
        var prezime = document.getElementById('prezime');
        var temperatura = document.getElementById('temperatura');
        var test = document.getElementById('test');
        var id = aktivnaBolnica.pacijenti.length;
        var pacijent = new Pacijent(id + 1, ime.value, prezime.value, Number(temperatura.value), test.value);
        aktivnaBolnica.dodajPacijenta(pacijent);
        aktivnaBolnica.refreshHTML();
    });
    document.getElementById('dodajSimptom').addEventListener('click', function () {
        var id = document.getElementById('ids');
        var simpotom = document.getElementById('simptom');
        var numberId = Number(id.value);
        var s = new Simptom(simpotom.value);
        for (var i = 0; i < aktivnaBolnica.pacijenti.length; i++) {
            if (aktivnaBolnica.pacijenti[i].id === numberId) {
                aktivnaBolnica.pacijenti[i].dodajSimptom(s);
            }
        }
        aktivnaBolnica.refreshHTML();
    });
    document.getElementById('procenat').addEventListener('click', function () {
        var oboleli = aktivnaBolnica.procentualnoObolelih();
        document.getElementById('podaci').innerHTML = "<h2>Procenutalan broj obolelih u bolnici ".concat(aktivnaBolnica.naziv, " je ").concat(oboleli, "%<h2>");
    });
    document.getElementById('bezSimptoma').addEventListener('click', function () {
        var pacijent = [];
        for (var i = 0; i < bolnice.length; i++) {
            var proba = bolnice[i].pacijenti;
            pacijent.push.apply(pacijent, proba);
        }
        var pozitivniPacijenti = pacijent.filter(function (p) { return p.pcrTest === 'Pozitivan'; });
        var pacijentBezSimptoma = pacijent.filter(function (p) { return p.ostaliSimptomi.length === 0 && p.pcrTest === 'Pozitivan'; });
        var procenat = (pacijentBezSimptoma.length / pozitivniPacijenti.length) * 100;
        document.getElementById('podaci').innerHTML = "<h2>Procenutalan broj obolelih koji nemaju simptome je: ".concat(procenat.toFixed(2), " %</h2>");
    });
    // document.getElementById('gradPozitivni').addEventListener('click',function(){
    //   const naj:grad[] = [];
    //   let duzinaBeograd:number = 0;
    //   bolnice.forEach(b => {
    //     if(b.grad == 'Beograd') {
    //       let pozitivniBG = b.pacijenti.filter(p => p.pcrTest == 'Pozitivan');
    //       duzinaBeograd +=pozitivniBG.length;    
    //     }
    //     else if(b.grad == 'Novi Sad') {
    //       let pozitivniNs = b.pacijenti.filter(p => p.pcrTest == 'Pozitivan');
    //       naj.push({naziv: 'Novi Sad', broj: pozitivniNs.length});
    //     }
    //     else if(b.grad == 'Nis') {
    //       let pozitivniNIS = b.pacijenti.filter(p => p.pcrTest == 'Pozitivan');
    //       naj.push({naziv: 'Nis', broj: pozitivniNIS.length});
    //     }
    //   });
    //   naj.push({naziv: 'Beograd', broj: duzinaBeograd});
    //   let najVeci = 0;
    //   let grad:grad;
    //   naj.forEach(v => {
    //     if(najVeci < v.broj) {
    //       najVeci = v.broj;
    //       grad = v;
    //     }
    //   });
    //   console.log(`Grad sa najvise pozitivnih pacijenata je ${grad.naziv} i ukupan broj obolelih je ${najVeci}!`);
    //   document.getElementById('podaci').innerText = `Grad sa najvise pozitivnih pacijenata je ${grad.naziv} i ukupan broj obolelih je ${najVeci}!`;
    // });
    document.getElementById('gradPozitivni').addEventListener('click', function () {
        var gradovi = {};
        bolnice.forEach(function (bolnica) {
            var grad = bolnica.grad;
            if (!(grad in gradovi)) {
                gradovi[grad] = 0;
            }
            var brojPozitivnih = bolnica.pacijenti.filter(function (pacijent) { return pacijent.pcrTest === 'Pozitivan'; }).length;
            gradovi[grad] += brojPozitivnih;
        });
        console.log(gradovi);
        var najvisePozitivnih = 0;
        var najvisePozitivnihGrad = '';
        Object.entries(gradovi).forEach(function (_a) {
            var grad = _a[0], brojPozitivnih = _a[1];
            if (brojPozitivnih > najvisePozitivnih) {
                najvisePozitivnih = brojPozitivnih;
                najvisePozitivnihGrad = grad;
            }
        });
        var rezultat = "Grad sa najvise pozitivnih pacijenata je ".concat(najvisePozitivnihGrad, " i ukupan broj obolelih je ").concat(najvisePozitivnih, "!");
        console.log(rezultat);
        document.getElementById('podaci').innerHTML = rezultat;
    });
    // -"Grad sa najvise pozitivnih" (id gradPozitivni)
    // 			U div sa IDem "podaci" upisati koji grad ima najvise pozitivnih pacijenata.
    // 			Za svaki grad izracunati koliko ima pozitivnih pacijenata, vodite racuna da vise bolnica mogu pripadati istom gradu.
    // 			HINT:
    // 				Prvo napraviti spisak svih gradova.
    // 				Nakon formiranja spiska svih gradova (niz-a), za svaki grad izracunati koliko ima pozitivnih pacijenata tako sto se saberu vrednosti pozitivnih pacijenata po bolnicama u tom gradu.
    // 				Ispis u divu treba da bude u obliku:
    // 					`Grad sa najvise pozitivnih pacijenata je ${grad}!`
    //TODO "Grad sa najvise pozitivnih"
    aktivnaBolnica.refreshHTML();
}
window.onload = function () {
    //KOD TESTIRATI OVDE
    //^^^^^^^^^^^^^^^^^^
    //   console.log(aktivnaBolnica.procentualnoObolelih());
    //Po potrebi zakomentarisati initializeData();
    // aktivnaBolnica.refreshHTML();
    initializeData();
    wireEvents();
};
function initializeData() {
    var bol = window.bol;
    var selekt = document.getElementById("bolnica");
    for (var i = 0; i < bol.length; i++) {
        var naziv = bol[i].naziv;
        var grad = bol[i].grad;
        var pacijenti = [];
        for (var j = 0; j < bol[i].pacijenti.length; j++) {
            var id = Number(bol[i].pacijenti[j].id);
            var ime = bol[i].pacijenti[j].ime;
            var prezime = bol[i].pacijenti[j].prezime;
            var temperatura = Number(bol[i].pacijenti[j].telesnaTemperatura);
            var pcrTest = bol[i].pacijenti[j].pcrTest;
            var simptomi = [];
            for (var k = 0; k < bol[i].pacijenti[j].ostaliSimptomi.length; k++) {
                var s = new Simptom(bol[i].pacijenti[j].ostaliSimptomi[k]);
                simptomi.push(s);
            }
            var p = new Pacijent(id, ime, prezime, temperatura, pcrTest);
            p.ostaliSimptomi = simptomi;
            pacijenti.push(p);
        }
        var b = new Bolnica(naziv, grad);
        b.pacijenti = pacijenti;
        if (aktivnaBolnica == null) {
            aktivnaBolnica = b;
            b.refreshHTML();
        }
        bolnice.push(b);
        var option = document.createElement("option");
        option.text = b.naziv;
        selekt.add(option);
    }
}
//# sourceMappingURL=app.js.map