var osobe = [
  { ime: "Pera", prezime: "Peric" },
  { ime: "Marko", prezime: "Markovic" },
  { ime: "Jovo", prezime: "Jovic" }];

const vratiValidno = (paramIme, paramPrz) => {
  return osobe.some((osoba) => {
    return osoba.ime.toUpperCase() === paramIme.toUpperCase() && osoba.prezime.toUpperCase() === paramPrz.toUpperCase();
  });
}

const proveraForme = (forma) => {
  const ime = forma.ime.value;
  const prz = forma.prezime.value;
  const validno = vratiValidno(ime, prz);
  if (!validno) {
    alert('Korisnik nije pronadjen');
    return false;
  }
  if (ime === '') {
    alert('Morate uneti ime');
    return false;
  }
  if (ime[0] != ime[0].toUpperCase()) {
    alert('Prvo slovo imena mora biti veliko');
    return false;
  }
  if (prz === '') {
    alert('Morate uneti prezime');
    return false;
  }
  if (prz[0] != prz[0].toUpperCase()) {
    alert('Prvo slovo prezimena mora biti veliko');
    return false;
  }
};

const onGetElement = (id) => {
  return document.getElementById(id);
};

const onSetCB = () => {
  const selekt1 = onGetElement('sel1');
  selekt1.value = 1;
  selekt1.disabled = !selekt1.disabled;
  onGetSelekt1Text();
}

const onGetSelekt1Text = () => {
  const selekt1 = onGetElement('sel1').selectedOptions[0].textContent;
  if (selekt1 == 'Platinum') {
    setVisibility('visible', false);
  }
  else {
    setVisibility('hidden', true);
  }
}

const setVisibility = (visi, dise) => {
  const selekt2 = onGetElement('sel2');
  selekt2.style.visibility = visi;
  selekt2.disabled = dise;
}

const onGetSelekt2 = () => {
  var boje = {
    rucak: "Crimson",
    pice: "Teal"
  };
  const selekt2 = onGetElement('sel2');
  const ptag = onGetElement('select_paragraf');
  ptag.textContent = 'Odabrali ste :'
  if (selekt2.value == 'rucak') {
    ptag.textContent += `${selekt2.value}`;
    rucakPice(boje.rucak);
  }
  else if (selekt2.value == 'pice') {
    ptag.textContent += `${selekt2.value}`;
    rucakPice(boje.pice);
  }
}

const rucakPice = (boja) => {
  const ptag = onGetElement('select_paragraf');
  const btn = onGetElement('submitbtn');
  ptag.style.backgroundColor = boja;
  btn.style.backgroundColor = boja;

}