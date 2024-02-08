/// <reference path="Bolnica.ts" />

let bolnice: Bolnica[] = [];
let aktivnaBolnica: Bolnica = null;

function promeniAktivnu(selekt: HTMLSelectElement): void {
  aktivnaBolnica = bolnice.filter((el) => el.naziv == selekt.value)[0];
  aktivnaBolnica.refreshHTML();
}

type grad = {
  naziv: string,
  broj: number;
};

function wireEvents(): void {
  document.getElementById('dodajPacijenta').addEventListener('click', function () {
    let ime = ((document.getElementById('ime') as unknown) as HTMLInputElement);
    let prezime = ((document.getElementById('prezime') as unknown) as HTMLInputElement);
    let temperatura = ((document.getElementById('temperatura') as unknown) as HTMLInputElement);
    let test = ((document.getElementById('test') as unknown) as HTMLSelectElement);

    let id: number = aktivnaBolnica.pacijenti.length;
    let pacijent = new Pacijent(id + 1, ime.value, prezime.value, Number(temperatura.value), test.value);
    aktivnaBolnica.dodajPacijenta(pacijent);
    aktivnaBolnica.refreshHTML();
  });

  document.getElementById('dodajSimptom').addEventListener('click', function () {
    const id = ((document.getElementById('ids') as unknown) as HTMLInputElement);
    const simpotom = ((document.getElementById('simptom') as unknown) as HTMLSelectElement);
    const numberId: number = Number(id.value);

    let s = new Simptom(simpotom.value);
    for (let i = 0; i < aktivnaBolnica.pacijenti.length; i++) {
      if (aktivnaBolnica.pacijenti[i].id === numberId) {
        aktivnaBolnica.pacijenti[i].dodajSimptom(s);
      }
    }

    aktivnaBolnica.refreshHTML();
  });

  document.getElementById('procenat').addEventListener('click', function () {
    const oboleli = aktivnaBolnica.procentualnoObolelih();
    document.getElementById('podaci').innerHTML = `<h2>Procenutalan broj obolelih u bolnici ${aktivnaBolnica.naziv} je ${oboleli}%<h2>`;
  });

  document.getElementById('bezSimptoma').addEventListener('click', function () {
    let pacijent: Pacijent[] = [];
    for (let i = 0; i < bolnice.length; i++) {
      let proba = bolnice[i].pacijenti;
      pacijent.push(...proba);
    }
    const pozitivniPacijenti = pacijent.filter(p => p.pcrTest === 'Pozitivan');
    const pacijentBezSimptoma = pacijent.filter(p => p.ostaliSimptomi.length === 0 && p.pcrTest === 'Pozitivan');
    const procenat: number = (pacijentBezSimptoma.length / pozitivniPacijenti.length) * 100;
    document.getElementById('podaci').innerHTML = `<h2>Procenutalan broj obolelih koji nemaju simptome je: ${procenat.toFixed(2)} %</h2>`
  });


  document.getElementById('gradPozitivni').addEventListener('click', function () {
    const bolnicama = bolnice.reduce((acc, bolnica) => {
      if (!acc[bolnica.grad]) {
        acc[bolnica.grad] = [];
      }
      const filtrirani = bolnica.pacijenti.filter(p => p.pcrTest == 'Pozitivan');
      acc[bolnica.grad].push(...filtrirani);

      return acc;

    }, {});
    let maxObolelih: number = 0;
    let grad: string = '';
    Object.entries(bolnicama).map(([kljuc, pacijent]: [string, Pacijent[]]) => {
      if (pacijent.length > maxObolelih) {
        maxObolelih = pacijent.length;
        grad = kljuc;
      }
    });
    console.log(grad, maxObolelih);
    document.getElementById('podaci').innerHTML = `Grad sa najvise pozitivnih pacijenata je ${grad}! ukupno obolelih ${maxObolelih}`;
  });









  // -"Grad sa najvise pozitivnih" (id gradPozitivni)
  // 			U div sa IDem "podaci" upisati koji grad ima najvise pozitivnih pacijenata.
  // 			Za svaki grad izracunati koliko ima pozitivnih pacijenata, vodite racuna da vise bolnica mogu pripadati istom gradu.

  // 			HINT:
  // 				Prvo napraviti spisak svih gradova.
  // 				Nakon formiranja spiska svih gradova (niz-a), za svaki grad izracunati koliko ima pozitivnih pacijenata tako sto se saberu vrednosti pozitivnih pacijenata po bolnicama u tom gradu.

  // 				Ispis u divu treba da bude u obliku:
  // 					`Grad sa najvise pozitivnih pacijenata je ${grad}!























  // document.getElementById('gradPozitivni').addEventListener('click', function () {

  //   const klijenti = bolnice.reduce((acc, bolnica) => {
  //     if (!acc[bolnica.grad]) {
  //       acc[bolnica.grad] = [];
  //     }
  //     const filtrirani = bolnica.pacijenti.filter(p => p.pcrTest == 'Pozitivan');
  //     acc[bolnica.grad].push(filtrirani);
  //     return acc;
  //   }, {});
  //   console.log(klijenti);


  //   const out = Object.entries(klijenti).map(([grad, pacijenti]: [string, Pacijent[]]) => {
  //     let ukupnoObolelih: number = pacijenti.reduce((prev, next) => {
  //       if (Array.isArray(next)) {
  //         return prev + next.length;
  //       } else {
  //         return prev;
  //       }
  //     }, 0);

  //     return { grad, ukupnoObolelih };
  //   });
  //   const maxVrednost = Math.max(...out.map(item => item.ukupnoObolelih));
  //   const gradNajviseObolelih = out.find(item => item.ukupnoObolelih === maxVrednost)?.grad;

  //   document.getElementById('podaci').innerText = `Grad sa najvise pozitivnih pacijenata je ${gradNajviseObolelih}! i ukupno ih ime ${maxVrednost}`;

  // });


  // old school
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







  //TODO "Grad sa najvise pozitivnih"
  aktivnaBolnica.refreshHTML();
}

window.onload = () => {
  //KOD TESTIRATI OVDE
  //^^^^^^^^^^^^^^^^^^
  //   console.log(aktivnaBolnica.procentualnoObolelih());
  //Po potrebi zakomentarisati initializeData();
  // aktivnaBolnica.refreshHTML();
  initializeData();
  wireEvents();
};



function initializeData() {
  let bol = (window as any).bol;
  let selekt = document.getElementById("bolnica") as HTMLSelectElement;
  for (let i = 0; i < bol.length; i++) {
    let naziv = bol[i].naziv;
    let grad = bol[i].grad;
    let pacijenti: Pacijent[] = [];
    for (let j = 0; j < bol[i].pacijenti.length; j++) {
      let id = Number(bol[i].pacijenti[j].id);
      let ime = bol[i].pacijenti[j].ime;
      let prezime = bol[i].pacijenti[j].prezime;
      let temperatura = Number(bol[i].pacijenti[j].telesnaTemperatura);
      let pcrTest = bol[i].pacijenti[j].pcrTest;
      let simptomi: Simptom[] = [];

      for (let k = 0; k < bol[i].pacijenti[j].ostaliSimptomi.length; k++) {
        let s = new Simptom(bol[i].pacijenti[j].ostaliSimptomi[k]);
        simptomi.push(s);
      }

      let p = new Pacijent(id, ime, prezime, temperatura, pcrTest);
      p.ostaliSimptomi = simptomi;
      pacijenti.push(p);
    }
    let b = new Bolnica(naziv, grad);
    b.pacijenti = pacijenti;
    if (aktivnaBolnica == null) {
      aktivnaBolnica = b;
      b.refreshHTML();
    }
    bolnice.push(b);
    let option = document.createElement("option");
    option.text = b.naziv;
    selekt.add(option);
  }
}