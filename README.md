# Gyakorlas
Feladat: Egy játék amiben a Jó Mágus (Gandalf The Grey) csap össze a Rossz Mágussal
(Devil The Purple) a csata egy függvényen keresztül játszódik le aminek a paramétere az ellenséges
varázsló. Bárki megtámadhatja a másikat, de a gonosz nagyobb valószínűséggel (70-30%) támadja
meg a másikat. A mágusoknak életereje és varázsereje van, a csata során ezek fogynak, akinek az
élete előbb lesz nulla az veszti a csatát. A csata után mindkét varázsló (az egyszerűség kedvéért)
ugyanannyi tapasztalati pontot kap.
Egy bizonyos TP elérése után a varázslok fejlődnek (öröklődés útján) a Grey → White,
Purple → Black. Fejlődésük során új varázslatokat kapnak életerejük megnő, stb...
Segítség: Itt már valamiféle tervet kéne készíteni, meg kéne tervezni milyen osztályok
lesznek, ezek, hogy fognak öröklődni egymásból, milyen függvényeik lesznek, illetve az osztályok
milyen kapcsolatban lesznek egymással (pl.: Banknak van egy Felhasználó listája → Varázslónak
van egy Varázslat listája). Az implementáció csak ez után kezdődhet.
