const levelOne = (a, b) => {
   return a + b;
};

const levelTwo = (letras) => {
   return letras
      .split('')
      .filter((l, i) => {
         return i % 2 === 0;
      })
      .join('');
};

const levelThree = (a, b) => {
   return a.concat(b).sort();
};

const levelFour = (num) => {
   let tot = 0;
   num.toString()
      .split('')
      .forEach((n) => {
         tot += Number(n);
      });
   let rev = Number(tot.toString().split('').reverse().join(''));
   return rev * tot === num;
};

module.exports = { levelOne, levelTwo, levelThree, levelFour };
